const { firestore } = require("../config/firebase");
const { Timestamp } = require("firebase-admin/firestore");
/**
 * Counts documents in a Firestore collection with an optional condition.
 * Supports counting based on instituteId.
 */
const getCollectionCount = async (collectionName, conditions = []) => {
  try {
    let query = firestore.collection(collectionName);

    conditions.forEach((condition) => {
      query = query.where(condition.field, condition.operator, condition.value);
    });

    const snapshot = await query.count().get();
    return snapshot.data().count;
  } catch (error) {
    console.error(`Error counting ${collectionName}:`, error);
    throw new Error(`Error fetching ${collectionName} count`);
  }
};

/**
 * Counts active polls where `endDate` is null or in the future and matches `instituteId`.
 */
const getActivePollsCount = async (instituteId) => {
  try {
    const now = new Date();

    const activePollsNullEndDate = await getCollectionCount("polls", [
      { field: "instituteId", operator: "==", value: instituteId },
      { field: "endDate", operator: "==", value: null },
    ]);

    const activePollsFutureEndDate = await getCollectionCount("polls", [
      { field: "instituteId", operator: "==", value: instituteId },
      { field: "endDate", operator: ">", value: now },
    ]);

    return activePollsNullEndDate + activePollsFutureEndDate;
  } catch (error) {
    console.error("Error counting active polls:", error);
    throw new Error("Error fetching active polls count");
  }
};

/**
 * Controller to get all dashboard stats based on `instituteId`.
 */
const getDashboardStats = async (req, res) => {
  try {
    const instituteId = req.headers["instituteid"];
    if (!instituteId) {
      return res.status(400).json({ error: "Institute ID is required" });
    }

    const [
      totalPolls,
      totalVotes,
      activePolls,
      totalComments,
      totalPolicies,
      totalEmployees,
    ] = await Promise.all([
      getCollectionCount("polls", [
        { field: "instituteId", operator: "==", value: instituteId },
      ]),
      getCollectionCount("votes", [
        { field: "instituteId", operator: "==", value: instituteId },
      ]),
      getActivePollsCount(instituteId),
      getCollectionCount("comments", [
        { field: "instituteId", operator: "==", value: instituteId },
      ]),
      getCollectionCount("policies", [
        { field: "instituteId", operator: "==", value: instituteId },
      ]),
      getCollectionCount("users", [
        { field: "institutes", operator: "array-contains", value: instituteId },
      ]), // Users with this institute
    ]);

    res.json({
      totalPolls,
      totalVotes,
      activePolls,
      totalComments,
      totalPolicies,
      totalEmployees,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserEngagement = async (req, res) => {
  try {
    const instituteId = req.headers.instituteid;
    const timeframe = req.query.timeframe || "month";

    if (!instituteId) {
      return res.status(400).json({ error: "Institute ID is required" });
    }

    // Calculate date range based on timeframe
    const now = new Date();
    let startDate;

    if (timeframe === "week") {
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 7);
    } else {
      startDate = new Date(now);
      startDate.setMonth(now.getMonth() - 1);
    }

    // Query analytics_events collection
    const eventsSnapshot = await firestore
      .collection("analytics_events")
      .where("instituteId", "==", instituteId)
      .where("timestamp", ">=", startDate)
      .get();

    // Process data
    const events = [];
    eventsSnapshot.forEach((doc) => {
      events.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    // Generate date labels
    const dates = [];
    const voteButtonData = [];
    const policyViewData = [];

    // For simplicity, we'll create date buckets (daily for week view, weekly for month view)
    const dateBuckets = {};
    const formatKey =
      timeframe === "week"
        ? (date) => date.toISOString().split("T")[0]
        : (date) => `Week ${Math.ceil(date.getDate() / 7)}`;

    // Initialize buckets
    if (timeframe === "week") {
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const key = formatKey(date);
        dates.push(key);
        dateBuckets[key] = { voteButton: 0, policyView: 0 };
      }
    } else {
      for (let i = 0; i < 4; i++) {
        const key = `Week ${i + 1}`;
        dates.push(key);
        dateBuckets[key] = { voteButton: 0, policyView: 0 };
      }
    }

    // Count events per bucket
    events.forEach((event) => {
      const eventDate = event.timestamp.toDate();
      const bucket = formatKey(eventDate);

      if (dateBuckets[bucket]) {
        if (event.eventName === "voteButton") {
          dateBuckets[bucket].voteButton++;
        } else if (event.eventName === "policyView") {
          dateBuckets[bucket].policyView++;
        }
      }
    });

    // Extract data for chart
    dates.forEach((date) => {
      voteButtonData.push(dateBuckets[date].voteButton);
      policyViewData.push(dateBuckets[date].policyView);
    });

    // Calculate total interactions and percent change
    const totalInteractions = events.length;

    // Get previous period data for comparison
    const previousPeriodStartDate = new Date(startDate);
    if (timeframe === "week") {
      previousPeriodStartDate.setDate(previousPeriodStartDate.getDate() - 7);
    } else {
      previousPeriodStartDate.setMonth(previousPeriodStartDate.getMonth() - 1);
    }

    const previousEventsSnapshot = await firestore
      .collection("analytics_events")
      .where("instituteId", "==", instituteId)
      .where("timestamp", ">=", previousPeriodStartDate)
      .where("timestamp", "<", startDate)
      .get();

    const previousTotal = previousEventsSnapshot.size;
    const percentChange =
      previousTotal > 0
        ? ((totalInteractions - previousTotal) / previousTotal) * 100
        : 0;

    res.json({
      totalInteractions,
      percentChange,
      chartData: {
        voteButton: voteButtonData,
        policyView: policyViewData,
      },
      dates,
    });
  } catch (error) {
    console.error("Error fetching engagement data:", error);
    res.status(500).json({ error: "Failed to fetch engagement data" });
  }
};

const getLast7DaysComments = async (req, res) => {
  try {
    const { instituteId } = req.query;

    if (!instituteId) {
      return res.status(400).json({ error: "Institute ID is required" });
    }

    const today = new Date();
    const last7Days = new Date();
    last7Days.setDate(today.getDate() - 6); // Include today in range

    const snapshot = await firestore
      .collection("comments")
      .where("instituteId", "==", instituteId)
      .where("createdAt", ">=", Timestamp.fromDate(last7Days)) // Filter last 7 days
      .get();

    const comments = snapshot.docs.map((doc) => doc.data());

    // Group by date
    const commentCounts = {};
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const formattedDate = date.toISOString().split("T")[0]; // Format YYYY-MM-DD
      commentCounts[formattedDate] = 0;
    }

    comments.forEach((comment) => {
      const commentDate = new Date(comment.createdAt.toDate())
        .toISOString()
        .split("T")[0];
      if (commentCounts[commentDate] !== undefined) {
        commentCounts[commentDate]++;
      }
    });

    res.json(commentCounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { getDashboardStats, getUserEngagement, getLast7DaysComments };

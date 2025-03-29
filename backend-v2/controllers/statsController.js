const { firestore } = require("../config/firebase");

/**
 * Counts documents in a Firestore collection with an optional condition.
 * Supports counting based on instituteId.
 */
const getCollectionCount = async (collectionName, conditions = []) => {
  try {
    let query = firestore.collection(collectionName);
    
    conditions.forEach(condition => {
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
    const instituteId = req.headers['instituteid'];
    if (!instituteId) {
      return res.status(400).json({ error: "Institute ID is required" });
    }

    const [totalPolls, totalVotes, activePolls, totalComments, totalPolicies, totalEmployees] = await Promise.all([
      getCollectionCount("polls", [{ field: "instituteId", operator: "==", value: instituteId }]),
      getCollectionCount("votes", [{ field: "instituteId", operator: "==", value: instituteId }]),
      getActivePollsCount(instituteId),
      getCollectionCount("comments", [{ field: "instituteId", operator: "==", value: instituteId }]),
      getCollectionCount("policies", [{ field: "instituteId", operator: "==", value: instituteId }]),
      getCollectionCount("users", [{ field: "institutes", operator: "array-contains", value: instituteId }]), // Users with this institute
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

module.exports = { getDashboardStats };

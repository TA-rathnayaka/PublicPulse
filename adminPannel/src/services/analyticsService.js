import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { firestore } from "../backend/firebase/firebase";

/**
 * Get total user participation in polls.
 * @returns {Promise<number>} Total user participation count
 */
export const getTotalUserParticipation = async () => {
  try {
    const eventsCollection = collection(firestore, "analytics_events");
    const q = query(eventsCollection, where("eventName", "==", "voteButton"));
    const snapshot = await getDocs(q);
    return snapshot.size;
  } catch (error) {
    console.error("Error fetching total user participation:", error);
    throw error;
  }
};

/**
 * Get today's and yesterday's voting counts and calculate the percentage change.
 * @returns {Promise<{ todayCount: number, yesterdayCount: number, percentageChange: number }>}
 */
export const getTodayAndYesterdayVotes = async () => {
  try {
    const eventsCollection = collection(firestore, "analytics_events");
    const now = new Date();
    const startOfToday = new Date(now.setHours(0, 0, 0, 0));
    const startOfYesterday = new Date(startOfToday);
    startOfYesterday.setDate(startOfYesterday.getDate() - 1);

    const todayQuery = query(
      eventsCollection,
      where("eventName", "==", "voteButton"),
      where("timestamp", ">=", startOfToday)
    );
    const yesterdayQuery = query(
      eventsCollection,
      where("eventName", "==", "voteButton"),
      where("timestamp", ">=", startOfYesterday),
      where("timestamp", "<", startOfToday)
    );

    const [todaySnapshot, yesterdaySnapshot] = await Promise.all([
      getDocs(todayQuery),
      getDocs(yesterdayQuery),
    ]);

    const todayCount = todaySnapshot.size;
    const yesterdayCount = yesterdaySnapshot.size;
    const percentageChange =
      yesterdayCount === 0
        ? todayCount > 0
          ? 100
          : 0
        : ((todayCount - yesterdayCount) / yesterdayCount) * 100;

    return { todayCount, yesterdayCount, percentageChange };
  } catch (error) {
    console.error("Error fetching today's and yesterday's votes:", error);
    throw error;
  }
};

/**
 * Get event counts per day for graph plotting.
 * @returns {Promise<Array<{ date: string, count: number }>>} Daily event data
 */
export const getDailyEventCounts = async () => {
  try {
    const eventsCollection = collection(firestore, "analytics_events");
    const q = query(eventsCollection, orderBy("timestamp"));
    const snapshot = await getDocs(q);

    const dailyCounts = {};
    snapshot.forEach((doc) => {
      const event = doc.data();

      if (event.timestamp && event.timestamp.toDate) {
        const date = event.timestamp.toDate().toISOString().split("T")[0]; // Convert to YYYY-MM-DD
        dailyCounts[date] = (dailyCounts[date] || 0) + 1;
      } else {
        console.warn("Invalid or missing timestamp for event:", doc.id, event);
      }
    });

    return Object.entries(dailyCounts).map(([date, count]) => ({
      date,
      count,
    }));
  } catch (error) {
    console.error("Error fetching daily event counts:", error);
    throw error;
  }
};

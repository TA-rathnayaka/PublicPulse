import { collection, query, where, getDocs, orderBy , onSnapshot} from "firebase/firestore";
import { firestore } from "../backend/firebase/firebase"; // Adjust the import based on your folder structure

/**
 * Function to fetch total user participation (total votes)
 */
export const getTotalUserParticipation = async () => {
  const eventsCollection = collection(firestore, "analytics_events");
  const q = query(eventsCollection, where("eventName", "==", "voteButton"));
  
  const snapshot = await getDocs(q);
  return snapshot.size;
};

/**
 * Function to fetch today's and yesterday's votes and calculate percentage change
 */
export const getTodayAndYesterdayVotes = async () => {
  const eventsCollection = collection(firestore, "analytics_events");
  const now = new Date();
  const startOfToday = new Date(now.setHours(0, 0, 0, 0));
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);

  // Today's votes
  const todayQuery = query(
    eventsCollection,
    where("eventName", "==", "voteButton"),
    where("timestamp", ">=", startOfToday)
  );
  const todaySnapshot = await getDocs(todayQuery);
  const todayCount = todaySnapshot.size;

  // Yesterday's votes
  const yesterdayQuery = query(
    eventsCollection,
    where("eventName", "==", "voteButton"),
    where("timestamp", ">=", startOfYesterday),
    where("timestamp", "<", startOfToday)
  );
  const yesterdaySnapshot = await getDocs(yesterdayQuery);
  const yesterdayCount = yesterdaySnapshot.size;

  // Calculate percentage change
  const percentageChange = yesterdayCount
    ? ((todayCount - yesterdayCount) / yesterdayCount) * 100
    : 0;

  return { todayCount, yesterdayCount, percentageChange };

  
};

/**
 * Real-time listener for event counts per day.
 * @param {function} onUpdate Callback function for real-time data updates
 * @param {function} onError Callback function for handling errors
 * @returns {function} Unsubscribe function to stop listening to updates
 */
export const subscribeToDailyEventCounts = (onUpdate, onError) => {
  const eventsCollection = collection(firestore, "analytics_events");
  const q = query(eventsCollection, orderBy("timestamp"));

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
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

      const eventData = Object.entries(dailyCounts).map(([date, count]) => ({
        date,
        count,
      }));

      onUpdate(eventData);
    },
    (error) => {
      onError(error);
    }
  );

  return unsubscribe;
};


import { Timestamp } from "firebase/firestore";

export const fromFirestoreTimestamp = (
    ts: { seconds: number; nonoseconds: number } | null
): Date | null => {
    if (!ts) return null;
    if (ts instanceof Timestamp) {
        return new Timestamp(ts.seconds, ts.nanoseconds).toDate();
    } else {
        return null;
    }
};

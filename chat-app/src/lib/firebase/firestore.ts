import {
    collection,
    addDoc,
    getDocs,
    where,
    query,
    orderBy,
    onSnapshot,
    doc,
    updateDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { fromFirestoreTimestamp } from "../utils/convert";
import { ChatType } from "@/app/chat/rooms/[roomId]/layout";
import { bnBD } from "@mui/material/locale";

// export const addMessage = async (text: string, userId: string) => {
//     const docRef = await addDoc(collection(db, "chat"), {
//         text,
//         userId,
//         createdAt: new Date(),
//         isRead: false,
//     });
//     return docRef;
// };

export const fetchUserDisplayName = async (uid: string) => {
    const q = query(collection(db, "users"), where("userId", "==", uid));
    const userSnap = await getDocs(q);

    return userSnap;
};

export interface RoomType {
    id: string;
    members: string[];
    name: string;
}

export const fetchMyChatRooms = async (uid: string) => {
    const roomsRef = collection(db, "rooms");
    const _q = query(roomsRef, where("members", "array-contains", uid));
    const querySnapshot = await getDocs(_q);

    return querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return [
            {
                id: doc.id,
                name: data.name,
                members: data.members,
            },
        ];
    });
};

export const getMessages = async (roomId: string): Promise<ChatType[]> => {
    const _q = query(collection(db, "rooms", roomId, "messages"), orderBy("createdAt", "asc"));
    const snapshot = await getDocs(_q);
    return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            message: data.message,
            senderId: data.senderId,
            createdAt: fromFirestoreTimestamp(data.createdAt),
            isRead: data.isRead,
        };
    });
};

export const subscribeMessages = (roomId: string, callback: (message: ChatType[]) => void) => {
    const _q = query(collection(db, "rooms", roomId, "messages"), orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(_q, (snapshot) => {
        const messages = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                message: data.message,
                senderId: data.senderId,
                createdeAt: fromFirestoreTimestamp(data.creadtedAt),
                isRead: data.isRead,
            };
        });
        console.log({ messages });
        callback(messages);
    });

    return unsubscribe;
};

export const markAsRead = async (roomId: string, messages: ChatType[], currentUserID: string) => {
    for (const message of messages) {
        if (message.senderId !== currentUserID && message.isRead === false && message.id) {
            const msgRef = doc(db, "rooms", roomId, "messages", message.id);
            await updateDoc(msgRef, { isRead: true });
            console.log("update!!!");
        }
    }
};

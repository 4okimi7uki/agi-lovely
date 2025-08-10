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
    getDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { fromFirestoreTimestamp } from "../utils/convert";
import { ChatType, RoomType, UserType } from "@/app/types/chat";
import { callbackify } from "util";
import { Unsubscribe, User } from "firebase/auth";

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

export const fetchUsers = async () => {
    const q = query(collection(db, "users"));
    const userSnap = await getDocs(q);
    return userSnap.docs.map((user) => {
        const data = user.data();
        return [
            {
                displayName: data.displayName,
                email: data.email,
                photoURL: data.photoURL,
                uid: data.uid,
            },
        ];
    });
};

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
// fetchTheRoom;
export const unsubscribeRoom = (
    roomId: string,
    callback: (room: RoomType | null) => void
): Unsubscribe => {
    const ref = doc(db, "rooms", roomId);
    return onSnapshot(ref, (snapshot) => {
        if (!snapshot.exists()) return callback(null);
        const data = snapshot.data();
        callback({
            id: snapshot.id,
            name: data?.name as string,
            members: data?.members as string[],
        });
    });
};

export const createTalkRoom = async (membersId: string[], name: string) => {
    try {
        await addDoc(collection(db, "rooms"), {
            members: membersId,
            name: name,
        });
    } catch (err) {
        console.error(err);
    }
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

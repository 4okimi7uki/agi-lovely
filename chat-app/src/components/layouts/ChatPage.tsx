"use client";
import React, { useEffect, useRef, useState } from "react";
import TimeLine from "./TimeLine";
import InputBox from "./InputBox";
import { useParams } from "next/navigation";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useAuth } from "@/lib/firebase/AuthContext";
import { db } from "@/lib/firebase/firebase";
import { getMessages, markAsRead, subscribeMessages } from "@/lib/firebase/firestore";
import { ChatType } from "@/app/types/chat";

function ChatPage() {
    const [inputMessage, setInputMessage] = useState<string>("");
    const [chats, setChats] = useState<ChatType[]>([]);
    const { user } = useAuth();

    const params = useParams();
    const roomId = params.roomId as string;

    useEffect(() => {
        if (!user) return;
        const fetchChats = async () => {
            const messages = await getMessages(roomId);
            console.log({ messages });
            setChats(Object.values(messages).flat());
        };
        fetchChats();
    }, [user]);

    const sendMessage = async () => {
        if (inputMessage === "") return;
        try {
            await addDoc(collection(db, "rooms", roomId, "messages"), {
                message: inputMessage,
                senderId: user?.uid,
                createdAt: serverTimestamp(),
                isRead: false,
            });
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = () => {
        sendMessage();
    };

    useEffect(() => {
        if (!roomId) return;
        const unsubscribe = subscribeMessages(roomId, setChats);

        return () => {
            unsubscribe(); // リスナー解除
        };
    }, [roomId]);

    useEffect(() => {
        if (!user || chats.length === 0) return;
        markAsRead(roomId, chats, user?.uid);
        scrollToTarget();
    }, [chats]);

    const targetRef = useRef<HTMLDivElement>(null);
    const scrollToTarget = () => {
        if (targetRef) {
            targetRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="h-full">
            <div className="h-[calc(100%-100px)]">
                <TimeLine chats={chats} bottomRef={targetRef} />
            </div>
            <div className="h-[100px]">
                <InputBox
                    setInputMessage={setInputMessage}
                    inputMessage={inputMessage}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
}

export default ChatPage;

"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/firebase/AuthContext";
import clsx from "clsx";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { ChatType } from "@/app/types/chat";

interface TimeLineProps {
    chats: ChatType[];
    bottomRef: React.RefObject<HTMLDivElement | null>;
}

function TimeLine({ chats, bottomRef }: TimeLineProps) {
    const { user, isLoading } = useAuth();

    return (
        <div className="flex h-full flex-col gap-2 overflow-auto border border-[#eee] bg-gray-50 p-4 text-[#333]">
            {chats.map((chat, i) => {
                return (
                    <div
                        key={"talk-id-" + chat.id}
                        className={clsx("w-fit", chat.senderId === user?.uid ? "ml-auto" : "")}
                    >
                        <div
                            className={clsx(
                                "flex gap-2",
                                chat.senderId === user?.uid ? "flex-row-reverse" : ""
                            )}
                        >
                            <div className="flex flex-col gap-1">
                                <div className={clsx("px-1 text-[12px]")}>{chat.displayName}</div>
                                <div
                                    className={twMerge(
                                        "flex flex-col rounded-[10px] bg-gray-50 p-3 shadow-[var(--shadow)]",
                                        chat.senderId === user?.uid ? "bg-[#e8f2ee]" : ""
                                    )}
                                >
                                    <div>{chat.message}</div>
                                </div>
                            </div>
                            <div className={clsx("flex flex-col justify-end")}>
                                <div className="text-[12px]">
                                    {chat.senderId === user?.uid && chat.isRead ? "read" : ""}
                                </div>
                                <div className="flex items-end text-[11px]">
                                    {dayjs(chat.createdAt).format("HH:mm")}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
            <div data-info="bottom" ref={bottomRef}></div>
        </div>
    );
}

export default TimeLine;

"use client";

import clsx from "clsx";
import dayjs from "dayjs";
import React from "react";

interface ChatType {
    id: number;
    message: string;
    displayName: string;
    userId: string | number;
    isRead: boolean;
    timeStamp: string;
}

const sampleChat: ChatType[] = [
    {
        id: 1,
        message: "Hello world",
        displayName: "Mizuki Aoki",
        userId: 1,
        isRead: true,
        timeStamp: dayjs().toString(),
    },
    {
        id: 2,
        message: "やっほー",
        displayName: "User1",
        userId: 2,
        isRead: false,
        timeStamp: dayjs().toString(),
    },
    {
        id: 3,
        message: "やっほー!",
        displayName: "User1",
        userId: 2,
        isRead: false,
        timeStamp: dayjs().toString(),
    },
    {
        id: 4,
        message: "ウエイ",
        displayName: "User1",
        userId: 2,
        isRead: false,
        timeStamp: dayjs().toString(),
    },
];

function TimeLine() {
    return (
        <div className="flex h-full flex-col gap-2 overflow-auto border border-[#eee] bg-gray-50 p-4 text-[#333]">
            {sampleChat.map((item, i) => {
                return (
                    <div
                        key={"talk-id-" + item.id}
                        className={clsx("w-fit", item.userId === 1 ? "ml-auto" : "")}
                    >
                        <div
                            className={clsx(
                                "flex gap-2",
                                item.userId === 1 ? "flex-row-reverse" : ""
                            )}
                        >
                            <div className="flex flex-col gap-1">
                                <div className={clsx("px-1 text-[12px]")}>{item.displayName}</div>
                                <div className="flex flex-col rounded-[10px] bg-gray-50 p-3 shadow-[var(--shadow)]">
                                    <div>{item.message}</div>
                                </div>
                            </div>
                            <div className={clsx("flex flex-col justify-end")}>
                                <div className="text-[12px]">
                                    {item.userId === 1 && item.isRead === true ? "read" : ""}
                                </div>
                                <div className="flex items-end text-[11px]">
                                    {dayjs(item.timeStamp).format("HH:mm")}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default TimeLine;

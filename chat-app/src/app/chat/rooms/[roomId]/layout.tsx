"use client";

import Header from "@/components/layouts/Header";
import InputBox from "@/components/layouts/InputBox";
import Loading from "@/components/layouts/Loading";
import { useAuth } from "@/lib/firebase/AuthContext";
import { db } from "@/lib/firebase/firebase";
import { getMessages } from "@/lib/firebase/firestore";
import { doc, query, serverTimestamp, setDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export interface ChatType {
    id?: string;
    message?: string;
    displayName?: string;
    senderId?: string | number;
    isRead?: boolean;
    createdAt?: Date | null;
}

function layout({ children }: Readonly<{ children: React.ReactNode }>) {
    const { user, isLoading } = useAuth();

    return (
        <div className="h-[100svh]">
            <div data-info="" className="h-[50px]">
                <Header />
            </div>
            <div data-info="body" className="h-[calc(100%-50px)]">
                {children}
            </div>
            {/* <div data-info="below" className="h-[10%]">
                <InputBox onSubmit={handleSubmit} setInputmessage={setInputmessage} />
            </div> */}
            {isLoading && (
                <div className="absolute right-0 left-0 h-[100svh] w-full">
                    <Loading />
                </div>
            )}
        </div>
    );
}

export default layout;

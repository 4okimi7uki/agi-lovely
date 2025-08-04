"use client";

import Header from "@/components/layouts/Header";
import Loading from "@/components/layouts/Loading";
import { useAuth } from "@/lib/firebase/AuthContext";

export interface ChatType {
    id?: string;
    message?: string;
    displayName?: string;
    senderId?: string | number;
    isRead?: boolean;
    createdAt?: Date | null;
}

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    const { user, isLoading } = useAuth();

    return (
        <div className="h-[100svh]">
            <div data-info="" className="h-[50px]">
                <Header />
            </div>
            <div data-info="body" className="h-[calc(100%-50px)]">
                {children}
            </div>
            {isLoading && (
                <div className="absolute right-0 left-0 h-[100svh] w-full">
                    <Loading />
                </div>
            )}
        </div>
    );
}

export default Layout;

"use client";
import { useAuth } from "@/lib/firebase/AuthContext";
import { handleGoogleLogin } from "@/lib/firebase/authGoogleSignin";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";

function LoginPage() {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && user) {
            router.push("/chat");
        }
    }, [user, isLoading, router]);

    if (!isLoading && user) {
        return null;
    }

    return (
        <div className="h-[100svh] content-center bg-[#eee] text-center">
            <h1>Login</h1>
            <button
                className="cursor-pointer bg-amber-200"
                onClick={async () => {
                    await handleGoogleLogin();
                }}
            >
                sign up
            </button>
        </div>
    );
}

export default LoginPage;

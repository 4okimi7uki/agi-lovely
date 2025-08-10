"use client";
import { useAuth } from "@/lib/firebase/AuthContext";
import { handleGoogleLogin } from "@/lib/firebase/authGoogleSignin";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";

function LoginPage() {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && user) {
            router.push("/chat/rooms");
        }
    }, [user, isLoading, router]);

    if (!isLoading && user) {
        return null;
    }

    return (
        <div className="h-[100svh] content-center bg-[#77aab5] text-center">
            <h1>Login</h1>
            <Button
                className="cursor-pointer"
                onClick={async () => {
                    await handleGoogleLogin();
                }}
            >
                sign up
            </Button>
        </div>
    );
}

export default LoginPage;

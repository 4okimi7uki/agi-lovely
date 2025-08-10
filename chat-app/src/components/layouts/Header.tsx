"use client";

import React, { useEffect, useState } from "react";
import { handleGoogleLogin } from "../../lib/firebase/authGoogleSignin";
import { useAuth } from "@/lib/firebase/AuthContext";
import { Menu, MenuItem } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "@geist-ui/icons";
import { fetchMyChatRooms, unsubscribeRoom } from "@/lib/firebase/firestore";
import { RoomType } from "@/app/types/chat";

function Header() {
    const { user, isLoading } = useAuth();
    const [room, setRoom] = useState<RoomType | null>(null);

    const [isOpenContextMenu, setIsOpenContext] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleCloseMenu = () => {
        setIsOpenContext(false);
    };

    const router = useRouter();
    const params = useParams();
    const roomId = params.roomId as string;

    useEffect(() => {
        if (!roomId) return;
        const unsub = unsubscribeRoom(roomId, setRoom);

        return () => unsub();
    }, [roomId]);

    return (
        <div className="flex h-full items-center justify-between gap-2 bg-gray-100 px-5 text-[#333] shadow-[var(--shadow)]">
            <div>
                <Link href="/chat/rooms">
                    <ChevronLeft />
                </Link>
            </div>
            <div>{room?.name}</div>
            {!isLoading && (
                <div
                    className="ml-auto flex cursor-pointer items-center gap-1"
                    onClick={(e: React.MouseEvent<HTMLElement>) => {
                        setIsOpenContext(true);
                        setAnchorEl(e.currentTarget);
                    }}
                >
                    <img className="h-[20px] w-[20px]" src={user?.photoURL ?? ""} alt="" />
                    {user?.displayName}
                </div>
            )}
            <Menu
                id="fade-menu"
                slotProps={{
                    list: {
                        "aria-labelledby": "fade-button",
                    },
                }}
                anchorEl={anchorEl}
                open={isOpenContextMenu}
                onClose={handleCloseMenu}
            >
                <MenuItem
                    onClick={() => {
                        handleCloseMenu();
                        signOut(auth);
                        router.push("/login");
                    }}
                >
                    Log out
                </MenuItem>
            </Menu>
        </div>
    );
}

export default Header;

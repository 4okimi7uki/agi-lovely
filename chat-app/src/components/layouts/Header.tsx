"use client";

import React, { useEffect, useState } from "react";
import { handleGoogleLogin } from "../../lib/firebase/authGoogleSignin";
import { useAuth } from "@/lib/firebase/AuthContext";
import { Menu, MenuItem } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { useRouter } from "next/navigation";

function Header() {
    const { user, isLoading } = useAuth();
    const [isOpenContextMenu, setIsOpenContext] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleCloseMenu = () => {
        setIsOpenContext(false);
    };

    const router = useRouter();

    return (
        <div className="flex h-full items-center justify-between bg-gray-100 px-5 text-[#333] shadow-[var(--shadow)]">
            <div>
                {/* <button
                    onClick={async () => {
                        const res = await handleGoogleLogin();
                        console.log({ res });
                    }}
                >
                    Google
                </button> */}
            </div>
            {!isLoading && (
                <div
                    className="ml-auto flex items-center gap-1"
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

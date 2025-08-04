"use client";
import React, { useEffect, useState } from "react";
import { Plus } from "@geist-ui/icons";
import { FormControl, Modal } from "@mui/material";
import { useAuth } from "@/lib/firebase/AuthContext";
import { fetchMyChatRooms } from "@/lib/firebase/firestore";
import Link from "next/link";

interface RoomType {
    id: string;
    members: string[];
    name: string;
}

function roomList() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [rooms, setRooms] = useState<RoomType[]>([]);
    const { user } = useAuth();

    console.log(user?.photoURL);

    const handleCloseModal = () => {
        setIsOpenModal(false);
    };

    useEffect(() => {
        if (!user) return;
        const getRooms = async () => {
            const res = await fetchMyChatRooms(user.uid);
            setRooms(Object.values(res).flat());
            console.log({ res });
        };
        getRooms();
    }, [user]);

    console.log({ rooms });
    console.log({ ...rooms });

    return (
        <div className="h-[100svh]">
            <div className="flex h-[50px] w-full items-center bg-gray-700 px-2 shadow-[var(--shadow)]">
                <button
                    className="cursor-pointer rounded hover:bg-[#eeeeee2f]"
                    onClick={() => {
                        setIsOpenModal(true);
                    }}
                >
                    <Plus color="#fff" />
                </button>
            </div>
            <ul>
                {rooms.map((room, i) => {
                    return (
                        <li
                            key={room.id}
                            className="transition-all duration-100 hover:bg-[#bfc3fc35]"
                        >
                            <Link href={`/chat/rooms/${room.id}`} className="block w-full">
                                {room.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
            <Modal
                open={isOpenModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="flex h-full w-full items-center justify-center text-[#333]"
            >
                <FormControl className="w-[90%] bg-gray-50">
                    <input type="text" />
                    <button>zxx</button>
                </FormControl>
            </Modal>
        </div>
    );
}

export default roomList;

"use client";
import React, { useEffect, useState } from "react";
import { Plus } from "@geist-ui/icons";
import { Button, Checkbox, FormControl, Input, Modal } from "@mui/material";
import { useAuth } from "@/lib/firebase/AuthContext";
import {
    createTalkRoom,
    fetchMyChatRooms,
    fetchUsers,
    unsubscribeRoom,
} from "@/lib/firebase/firestore";
import Link from "next/link";
import { RoomType, UserType } from "@/app/types/chat";
import Image from "next/image";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

function RoomList() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [rooms, setRooms] = useState<RoomType[] | null>(null);
    const [users, setUsers] = useState<UserType[]>([]);
    const [formTitle, setFormTitle] = useState<string>("お友達");
    const { user } = useAuth();
    const [selectMembers, setSelectMembers] = useState<UserType[]>([]);

    const handleCloseModal = () => {
        setIsOpenModal(false);
    };

    useEffect(() => {
        if (!user) return;
        const getRooms = async () => {
            const res = await fetchMyChatRooms(user.uid);
            setRooms(Object.values(res).flat());
            setSelectMembers([
                {
                    photoURL: user?.photoURL as string,
                    displayName: user?.displayName as string,
                    email: user?.email as string,
                    uid: user?.uid as string,
                },
            ]);
        };
        getRooms();
    }, [user]);

    useEffect(() => {
        if (selectMembers.length > 1) {
            setFormTitle(`選択中 ${selectMembers.length - 1}`);
        } else {
            setFormTitle(`お友達`);
        }
    }, [selectMembers]);

    useEffect(() => {
        const getUsers = async () => {
            const res = await fetchUsers();
            console.log(Object.values(res).flat());
            setUsers(Object.values(res).flat());
        };
        getUsers();
    }, []);

    // const submitForm = async (e) => {
    //     console.log(formData.get("talkRoomName"));
    //     const name = formData.get("talkRoomName") ?? "新規作成";
    //     await createTalkRoom(selectMembers, name as string);
    // };

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
            <div className="flex h-[calc(100%-50px)] flex-col items-center justify-center bg-[#333]">
                <ul className="w-[80%] rounded-[10px] bg-gray-100 p-3">
                    <li>
                        <h1 className="mb-3 text-center text-[#333]">My Talk Rooms</h1>
                    </li>
                    {rooms ? (
                        rooms.length > 0 ? (
                            rooms.map((room, i) => {
                                return (
                                    <li
                                        key={room.id}
                                        className="rounded-[6px] p-2 text-[#333] shadow transition-all duration-100 hover:bg-[#bfc3fc35]"
                                    >
                                        <Link
                                            href={`/chat/rooms/${room.id}`}
                                            className="block w-full"
                                        >
                                            {room.name}
                                        </Link>
                                    </li>
                                );
                            })
                        ) : (
                            <li className="text-center text-[#333]">トークがありません</li>
                        )
                    ) : (
                        <li className="flex justify-center">
                            <Image src="/3-dots-move.svg" alt="loading" width={80} height={80} />
                        </li>
                    )}
                </ul>
            </div>
            <Modal
                open={isOpenModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="flex h-full w-full items-center justify-center text-[#333]"
            >
                <FormControl className="w-[90%] rounded bg-gray-50">
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            console.log(selectMembers.map((member) => member.uid));
                            try {
                                const formData = new FormData(e.currentTarget);
                                const name = formData.get("talkRoomName");
                                console.log({ name });
                                const res = await createTalkRoom(
                                    selectMembers.map((member) => member.uid),
                                    name === "" ? "新規作成" : (name as string)
                                );
                            } catch (err) {
                                console.error(err);
                            }
                        }}
                        className="h-full w-full p-3"
                    >
                        <div className="flex justify-between">
                            <Input type="text" placeholder="トークルーム名" name="talkRoomName" />
                            <Button type="submit" variant="contained" className="bg-amber-200">
                                Create!
                            </Button>
                        </div>
                        <h1 className="text-center">{formTitle}</h1>
                        {users
                            .filter((u) => u.uid !== user?.uid)
                            .map((item, i) => {
                                return (
                                    <li key={i} className="flex items-center gap-1.5">
                                        <Checkbox
                                            icon={<RadioButtonUncheckedIcon />}
                                            checkedIcon={<CheckCircleOutlineIcon />}
                                            checked={selectMembers.some(
                                                (sm) => sm.uid === item.uid
                                            )}
                                            onChange={(_, checked) => {
                                                setSelectMembers((prev) =>
                                                    checked
                                                        ? [...prev, item]
                                                        : prev.filter((m) => m.uid !== item.uid)
                                                );
                                            }}
                                        />

                                        {item.displayName}
                                    </li>
                                );
                            })}
                    </form>
                </FormControl>
            </Modal>
        </div>
    );
}

export default RoomList;

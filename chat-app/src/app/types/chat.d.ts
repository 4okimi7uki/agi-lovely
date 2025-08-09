export interface RoomType {
    id: string;
    members: string[];
    name: string;
}

export interface ChatType {
    id?: string;
    message?: string;
    displayName?: string;
    senderId?: string | number;
    isRead?: boolean;
    createdAt?: Date | null;
}

import React from "react";
import Image from "next/image";

function Loading() {
    return (
        <div className="flex h-[100svh] w-full items-center justify-center bg-[#ffffff5b] backdrop-blur-sm">
            <Image src="/3-dots-move.svg" alt="loading" width={80} height={80} />
        </div>
    );
}

export default Loading;

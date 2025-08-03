import React from "react";
import { Send } from "@geist-ui/icons";

function InputBox() {
    return (
        <div className="h-full p-2">
            <div
                data-info="input-wrapper"
                className="border-gray- flex w-full justify-stretch rounded-[12px] border bg-[#ffffff2b] px-2 py-1"
            >
                <input type="text" className="w-[calc(100%-80px)] px-2 focus:border-0" />
                <button className="ml-auto flex aspect-square w-[50px] cursor-pointer items-center justify-center rounded-[50%] bg-[#0a0a0a] p-3">
                    <Send size={18} color="#ffff" />
                </button>
            </div>
        </div>
    );
}

export default InputBox;

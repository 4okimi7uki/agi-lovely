"use client";
import Header from "@/components/layouts/Header";
import InputBox from "@/components/layouts/InputBox";
import TimeLine from "@/components/layouts/TimeLine";
import React from "react";

function page() {
    return (
        <div className="flex h-[100svh] flex-col justify-stretch">
            <div data-info="" className="h-[50px]">
                <Header />
            </div>
            <div data-info="body" className="h-[calc(90%-50px)]">
                <TimeLine />
            </div>
            <div data-info="below" className="h-[10%]">
                <InputBox />
            </div>
        </div>
    );
}

export default page;

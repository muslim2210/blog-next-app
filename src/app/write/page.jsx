"use client";
import dynamic from "next/dynamic";
import React from "react";

// fix error deployment vercel
const WritePageQuill = dynamic(() => import("@/components/WritePageQuill"), {
  ssr: false,
});

const WritePage = () => {
  return <WritePageQuill />;
};

export default WritePage;

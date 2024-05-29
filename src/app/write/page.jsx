"use client";
import dynamic from "next/dynamic";
import React from "react";

const WritePageQuill = dynamic(() => import("@/components/WritePageQuill"), {
  ssr: false,
});

const WritePage = () => {
  return <WritePageQuill />;
};

export default WritePage;

"use client";

import { useRouter } from "next/navigation";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";

export default function PaginationPage({ page, hasPrev, hasNext }) {
  const router = useRouter();

  return (
    <div className="flex gap-10 justify-between">
      <button
        className="cursor-pointer bg-primary text-white px-4 py-2 disabled:cursor-not-allowed disabled:bg-primary/60 flex gap-x-2 items-center"
        disabled={!hasPrev}
        onClick={() => router.push(`?page=${page - 1}`)}
      >
        <GoArrowLeft />
        Prev
      </button>

      <button
        className="cursor-pointer bg-primary text-white px-4 py-2 disabled:cursor-not-allowed disabled:bg-primary/60 flex gap-x-2 items-center"
        disabled={!hasNext}
        onClick={() => router.push(`?page=${page + 1}`)}
      >
        Next
        <GoArrowRight />
      </button>
    </div>
  );
}

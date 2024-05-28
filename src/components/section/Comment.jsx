"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};

const Comments = ({ postSlug }) => {
  const { status } = useSession();

  const [desc, setDesc] = useState("");
  const [isCreated, setIsCreated] = useState(false);

  const router = useRouter();

  const { data, mutate, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/comments?postSlug=${postSlug}`,
    fetcher
  );

  const handleInput = (event) => {
    setDesc(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ desc, postSlug }),
    });
    setIsCreated(true);
    setDesc("");
    router.refresh();

    mutate();
  };

  return (
    <div className="max-w-[500px] lg:max-w-[600px] py-11 lg:py-20">
      <h1 className="text-xl font-medium mb-5">Comments</h1>

      {isCreated && <p className="text-lg">comment terkirim...</p>}

      {status === "authenticated" ? (
        <div className="flex flex-col gap-y-3">
          <Textarea
            placeholder="write a comment..."
            className=""
            value={desc}
            onChange={handleInput}
          />
          <Button className="w-[100px]" onClick={handleSubmit}>
            Send
          </Button>
        </div>
      ) : (
        <Link href="/login" className="text-base hover:text-primary">
          Login to write a comment
        </Link>
      )}
      <div className="flex flex-col gap-y-10 mt-14">
        {isLoading
          ? "loading"
          : data?.map((comment) => (
              <div className="flex flex-col gap-y-4" key={comment._id}>
                <div className="flex gap-x-4 items-center">
                  {comment?.user?.image && (
                    <Image
                      src={comment.user.image}
                      alt=""
                      width={55}
                      height={55}
                      className="rounded-full object-cover"
                      priority
                    />
                  )}
                  <div className="flex flex-col gap-y-1">
                    <span className="text-sm md:text-base capitalize">
                      {comment.user.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {comment.createdAt.substring(0, 10)}
                    </span>
                  </div>
                </div>
                <p className="text-sm md:text-base text-slate-500">
                  {comment.desc}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Comments;

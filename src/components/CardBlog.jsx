"use client";
import Image from "next/image";
import Link from "next/link";

export default function CardBlog({ post }) {
  return (
    <div className="relative flex flex-col gap-y-4">
      <Image
        src={post.img}
        alt={post.title}
        width={400}
        height={200}
        priority
        className="rounded-lg"
      />
      <div className="flex gap-x-3 text-sm items-center">
        <span className="text-primary uppercase">{post.category}</span>
        <hr className="w-[14px] h-[1px] bg-muted" />
        <span className="text-sm text-muted-foreground">{post.date}</span>
      </div>
      <h2 className="text-xl font-bold">{post.title}</h2>
      <Link
        href={`/post/${post.id}`}
        className="underline hover:text-primary text-sm"
      >
        Read more
      </Link>
    </div>
  );
}

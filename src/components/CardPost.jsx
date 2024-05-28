import Image from "next/image";
import Link from "next/link";

export default function CardPost({ key, post }) {
  const date = new Date(post.createdAt);
  return (
    <div className="max-w-[400px] md:max-w-[700px] lg:max-w-[900px]" key={key}>
      <div className="flex gap-x-11 item-center">
        <div className="hidden lg:block">
          {post.img && (
            <Image
              src={post.img}
              alt={post.title}
              width={400}
              height={200}
              priority
            />
          )}
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="flex gap-x-2 text-sm items-center">
            <div
              className={`${post.cat.bgColor} px-5 py-1 w-[90px] rounded-full`}
            >
              <p className="text-sm text-black text-center mx-auto capitalize">
                {post.catSlug}
              </p>
            </div>
            <hr className="w-[8px] h-[1px] bg-muted-foreground" />
            <p className="text-muted-foreground">{date.toLocaleDateString()}</p>
          </div>
          <Link href={`/post/${post.slug}`}>
            <h1 className="text-xl md:text-2xl font-bold max-w-[400px] hover:text-primary">
              {post.title}
            </h1>
          </Link>
          <div className="lg:hidden">
            {post.img && (
              <Image
                src={post.img}
                alt={post.title}
                width={400}
                height={200}
                priority
              />
            )}
          </div>
          {/* <p className="text-muted-foreground text-base md:text-lg max-w-[400px]">
            {post.desc.substring(0, 70)}...
          </p> */}
          <div
            className="text-muted-foreground text-base md:text-lg max-w-[400px]"
            dangerouslySetInnerHTML={{ __html: post?.desc.substring(0, 70) }}
          />
          <Link href={`/post/${post.slug}`} className="text-primary underline">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}

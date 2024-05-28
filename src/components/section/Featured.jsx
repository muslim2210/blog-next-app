import Image from "next/image";
import { Button } from "../ui/button";
import { blog } from "@/constant";
import { reproduce } from "@/app/api/recommend/route";
import Link from "next/link";

const getDataBlog = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recommend`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

export default async function Featured() {
  const data = await getDataBlog();

  return (
    <section className="py-12 lg:py-20">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-[45px] lg:text-[52px] max-w-[900px] mx-auto font-medium leading-normal md:leading-relaxed md:text-center mb-4">
          <b>Blog Next-app here! </b>
          Discover my stories and creative ideas.
        </h1>
        <hr className="h-[2px] bg-muted dark:bg-muted-foreground mx-auto" />
        <div className="flex flex-col md:flex-row gap-x-9 xl:gap-x-12 mt-14 xl:mt-20">
          {data?.slice(7, 8).map((post) => {
            return (
              <>
                <div
                  key={post._id}
                  className="hidden md:flex flex-1 max-w-[500px] lg:max-w-full h-[400px] xl:h-[450px] mx-auto relative"
                >
                  {post.img && (
                    <Image
                      src={post.img}
                      alt={post.title}
                      width={800}
                      height={400}
                      className="object-cover"
                      priority
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-y-5">
                  <h2 className="text-[26px] md:text-3xl lg:text-[34px] font-bold max-w-[400px] lg:max-w-[700px] leading-normal md:leading-relaxed lg:leading-relaxed">
                    {post.title}
                  </h2>

                  <div className="flex gap-x-2 items-center">
                    <div
                      className={`${post.cat.bgColor} px-5 py-1 rounded-full`}
                    >
                      <p className="text-sm text-black text-center mx-auto capitalize">
                        {post.catSlug}
                      </p>
                    </div>

                    <hr className="w-[8px] h-[1px] bg-black dark:bg-white" />
                    <span className="text-sm text-muted-foreground">
                      {post.createdAt.substring(0, 10)}
                    </span>
                  </div>

                  <p className="lg:hidden text-lg text-muted-foreground max-w-[350px] lg:max-w-full text-pretty">
                    {post.desc.substring(0, 100)}...
                  </p>
                  <p className="hidden xl:block text-lg text-muted-foreground text-pretty">
                    {post.desc.substring(0, 280)}...
                  </p>

                  <div className="max-w-[200px]">
                    <Button>
                      <Link href={`/post/${post.slug}`}>Read More</Link>
                    </Button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
}

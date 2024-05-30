import Comments from "@/components/section/Comment";
import Menu from "@/components/section/Menu";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const getData = async (slug) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

export default async function SinglePage({ params }) {
  const { slug } = params;

  const post = await getData(slug);
  return (
    <section className="container mx-auto py-11 lg:py-14">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-y-5 gap-x-8 lg:mt-7">
        <div className="flex flex-col gap-y-4 md:gap-y-6 lg:gap-y-9 max-w-[500px] lg:max-w-[600px]">
          <h1 className="text-2xl md:text-[26px] lg:text-[40px] font-bold max-w-[500px] lg:max-w-[550px] md:leading-relaxed lg:leading-relaxed">
            {post.title}
          </h1>
          <div className="flex gap-x-4 md:gap-x-5">
            {post?.user?.image && (
              <Image
                src={post.user.image}
                alt=""
                width={60}
                height={60}
                className="rounded-full object-cover"
                priority
              />
            )}

            <div className="flex flex-col gap-y-1 md:gap-y-2">
              <h5 className="text-base capitalize">{post?.user?.name}</h5>
              <div className="flex gap-x-2 text-sm items-center">
                <div
                  className={`max-w-[70px] ${post?.cat?.bgColor} px-3 py-1 rounded-full`}
                >
                  <p className="text-xs text-black mx-auto">{post.catSlug}</p>
                </div>

                <hr className="w-[8px] h-[1px] bg-muted" />
                <span className="text-xs text-muted-foreground">
                  {post?.createdAt?.substring(0, 10)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[600px]">
          {post.img && (
            <Image
              src={post.img}
              alt={post.title}
              width={600}
              height={400}
              className="object-cover"
              priority
            />
          )}
        </div>
      </div>
      <div className="flex justify-between gap-[50px] py-8 md:py-14">
        <div className="max-w-[400px] md:max-w-[450px] lg:max-w-[850px]">
          <div className="flex gap-x-3 mb-5 lg:mb-8">
            <Image
              src="/facebook.png"
              alt="facebook"
              width={24}
              height={24}
              priority
            />
            <Image
              src="/instagram.png"
              alt="instagram"
              width={24}
              height={24}
              priority
            />
            <Image
              src="/tiktok.png"
              alt="tiktok"
              width={24}
              height={24}
              priority
            />
            <Image
              src="/youtube.png"
              alt="youtube"
              width={24}
              height={24}
              priority
            />
          </div>

          <div
            className="text-justify text-sm md:text-[16px] lg:text-lg md:leading-normal text-slate-600 dark:text-slate-400"
            dangerouslySetInnerHTML={{ __html: post?.desc }}
          />
          <div>
            <Comments postSlug={slug} />
          </div>
        </div>
        <Menu />
      </div>
    </section>
  );
}

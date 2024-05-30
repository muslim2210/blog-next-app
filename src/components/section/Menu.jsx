import { blog } from "@/constant";
import MostPopular from "../MostPopular";
import CategoryItem from "../CategoryItem";
import EditorPick from "../EditorPick";

const getData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const getDataBlog = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recommend`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

export default async function Menu() {
  const category = await getData();
  const blog = await getDataBlog();

  return (
    <div className="hidden md:block">
      <div className="max-w-[270px] lg:max-w-[380px]">
        <span className="text-sm text-muted-foreground">What's hot</span>
        <h2 className="text-xl font-bold">Most Popular</h2>
        <div className="flex flex-col gap-y-5 lg:gap-y-8 mt-7 mb-5">
          {blog?.slice(8, 12).map((post) => (
            <MostPopular
              key={post.id}
              post={post}
              titleStyle="text-base lg:text-lg font-medium"
            />
          ))}
        </div>
        <hr className="h-[1px] bg-muted dark:bg-muted-foreground mx-auto mb-9" />
        <span className="text-sm text-muted-foreground">Discover by topic</span>
        <h2 className="text-xl font-bold">Categories</h2>
        <div className="grid grid-cols-3 gap-2 mt-7 mb-5">
          {category?.map((item) => (
            <CategoryItem
              key={item._id}
              {...item}
              containerStyles="py-1 px-2 rounded-xl max-w-[100px]"
              linkStyles="flex justify-center items-center"
              imageContainerStyles="hidden"
              imageStyles="hidden"
              textStyles="text-sm font-medium hover:text-primary"
            />
          ))}
        </div>
        <hr className="h-[1px] bg-muted dark:bg-muted-foreground mx-auto mb-9" />
        {/* <span className="text-sm text-muted-foreground">
          Choosen by the editor
        </span>
        <h2 className="text-xl font-bold">Editor Pick</h2>
        <div className="flex flex-col gap-y-5 lg:gap-y-8 mt-7 mb-5">
          {blog?.slice(2, 5).map((post) => (
            <EditorPick key={post.id} post={post} />
          ))}
        </div> */}
      </div>
    </div>
  );
}

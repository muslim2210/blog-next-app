import CategoryItem from "../CategoryItem";

const getData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

export default async function CategoryList() {
  const category = await getData();

  return (
    <div className="container mx-auto py-5">
      <h2 className="text-xl md:text-2xl font-medium md:font-bold">
        Popular Categories
      </h2>

      <div className="flex flex-row flex-wrap lg:flex-nowrap justify-center gap-x-4 lg:gap-x-7 gap-y-4 mt-7 lg:mt-10">
        {category?.map((item) => (
          <CategoryItem
            key={item._id}
            {...item}
            containerStyles="w-[150px] md:w-[200px] py-2 md:py-4 rounded-xl"
            linkStyles="flex max-w-[150px] mx-auto items-center gap-x-3"
            imageContainerStyles="w-[50px] h-[50px] rounded-full relative"
            imageStyles="rounded-full object-cover"
            textStyles="text-medium md:text-lg font-medium hover:text-primary"
          />
        ))}
      </div>
    </div>
  );
}

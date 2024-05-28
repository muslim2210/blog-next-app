import CardPostList from "@/components/section/CardPostList";
import CategoryList from "@/components/section/CategoryList";
import Featured from "@/components/section/Featured";
import Menu from "@/components/section/Menu";

export default function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;

  return (
    <main>
      <Featured />
      <CategoryList />
      <div className="container mx-auto py-11 lg:py-20">
        <div className="flex justify-between gap-[30px]">
          <CardPostList page={page} />
          <Menu />
        </div>
      </div>
    </main>
  );
}

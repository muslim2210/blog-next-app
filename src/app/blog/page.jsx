import CardPostList from "@/components/section/CardPostList";
import Menu from "@/components/section/Menu";
import { GoChevronRight } from "react-icons/go";

const BlogPage = ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1;

  const { cat } = searchParams;

  return (
    <div className="container mx-auto py-11 lg:py-20">
      <div className="flex gap-2 items-center mb-4">
        <h1 className="text-muted-foreground">Category</h1>
        <GoChevronRight />
        <h1 className="text-primary uppercase">#{cat}</h1>
      </div>
      <div className="flex justify-between gap-[30px]">
        <CardPostList page={page} cat={cat} />
        <Menu />
      </div>
    </div>
  );
};

export default BlogPage;

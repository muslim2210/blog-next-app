import Link from "next/link";
import { Badge } from "./ui/badge";

const MostPopular = ({ post, titleStyle }) => {
  const date = new Date(post.createdAt);
  return (
    <div className="flex flex-col gap-y-1">
      <Badge className={`bg-primary text-primary-foreground max-w-[70px]`}>
        <p className="text-xs mx-auto">{post.catSlug}</p>
      </Badge>
      <Link href={`/post/${post.slug}`}>
        <h1 className={`${titleStyle} hover:text-primary`}>{post.title}</h1>
      </Link>
      <p className="text-xs text-muted-foreground">
        {date.toLocaleDateString()}
      </p>
    </div>
  );
};

export default MostPopular;

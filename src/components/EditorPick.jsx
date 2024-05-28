import Image from "next/image";
import { Badge } from "./ui/badge";
import Link from "next/link";

const EditorPick = ({ post }) => {
  return (
    <div className="flex gap-x-4 items-center">
      <div className="relative w-1/5">
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
      </div>
      <div className="flex flex-col gap-y-2 w-4/5">
        <Badge className={"bg-primary text-primary-foreground max-w-[70px]"}>
          <p className="text-xs mx-auto">{post.catSlug}</p>
        </Badge>
        <Link href={`/post/${post.id}`}>
          <h1 className="text-sm lg:text-base font-medium hover:text-primary">
            {post.title}
          </h1>
        </Link>
        <div className="flex gap-x-3 items-center">
          <p className="text-xs capitalize">{post.author}</p>
          <p className="text-xs text-muted-foreground">{post.createdAt}</p>
        </div>
      </div>
    </div>
  );
};

export default EditorPick;

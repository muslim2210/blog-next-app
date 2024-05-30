import React from "react";
import Image from "next/image";
import Link from "next/link";

const CategoryItem = ({
  containerStyles,
  linkStyles,
  imageContainerStyles,
  imageStyles,
  textStyles,
  bgColor,
  title,
  img,
  id,
}) => {
  return (
    <>
      <div key={id}>
        <div className={`${containerStyles} ${bgColor}`}>
          <Link href={`/blog?cat=${title}`} className={`${linkStyles}`}>
            <div className={`relative ${imageContainerStyles}`}>
              {img && (
                <Image
                  src={img}
                  alt={title}
                  width={250}
                  height={250}
                  priority
                  className={`${imageStyles}`}
                />
              )}
            </div>
            <span className={`${textStyles} dark:text-black capitalize`}>
              {title}
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CategoryItem;

import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import { Image } from "@yext/pages/components";

const BlogCard = (props: CardProps<any>): JSX.Element => {
  const { result } = props;
  const { name } = result;
  const { primaryPhoto, slug, id, c_blogDetailLink } = result.rawData;

  return (
    <div className="w-full my-4 border bg-white">
      <div className=" space-y-4   mr-auto flex flex-col justify-between h-full">
        {primaryPhoto && <Image image={primaryPhoto} className="h-60"></Image>}
        <span className="px-2">
          <div className="text-xl">{name}</div>
          <div className="rounded-full text-sm my-6 hover:underline hover:cursor-pointer py-2  w-fit  font-semibold uppercase text-black ">
            <a href={`/${c_blogDetailLink}`}>Read blog</a>
          </div>
        </span>
      </div>
    </div>
  );
};

export default BlogCard;

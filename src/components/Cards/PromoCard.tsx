import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import { Image } from "@yext/pages/components";

const PromoCard = (props: CardProps<any>): JSX.Element => {
  const { result } = props;
  const { name } = result;
  const { primaryPhoto, description } = result.rawData;
  console.log(JSON.stringify(result));

  return (
    <div className="w-full my-4 border bg-[#1e1e1c]">
      <div className=" space-y-4  flex flex-row justify-between  items-center">
        <div className="w-1/2 ">
          {primaryPhoto && (
            <Image image={primaryPhoto} className="h-auto w-28"></Image>
          )}
        </div>
        <div className="px-2 w-1/2 flex justify-center text-white">
          <div className="w-3/4 space-y-4">
            <div className="text-3xl">{name}</div>
            <div>{description}</div>
            <div className="border-2 border-white px-4 py-2 rounded-full w-fit uppercase">
              <a href="https://www.vuse.com/ca/en/buy-online/vype-epod-vpro-cartridges">
                subscribe now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoCard;

import { Image } from "@yext/pages/components";
import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import Product from "../../types/products";
import NicotineLevel from "./nicotineLevel";
import { useState } from "react";

const ProductCard = (props: CardProps<Product>) => {
  const { result } = props;
  const { name } = result;
  const {
    slug,
    photoGallery,
    price,
    bundle,
    c_mixAndMatch,
    c_nicotineStrength,
    c_subscriptionPrice,
  } = result.rawData;
  const [subscr, setSubr] = useState(0);
  const [selectedStrength, setSelectedStrength] = useState(0);
  return (
    <div className="border bg-white p-6 flex flex-col gap-y-8 h-full">
      <a href={`/${slug}`}>
        <div>
          <Image image={photoGallery![0]}></Image>
        </div>
        <div className="flex flex-col justify-between gap-y-6 ">
          {c_mixAndMatch && (
            <div className="text-center bg-purple-100 text-purple-800 font-semibold text-sm p-2 w-full">
              {c_mixAndMatch}
            </div>
          )}
          <div className="flex flex-col">
            <div className="font-light h-10">{name}</div>
          </div>
          <hr />
          {bundle && (
            <div className="flex flex-col  gap-2">
              <div className="  font-semibold  uppercase text-sm">Bundle</div>
              <div className="font-bold w-full text-white bg-black flex justify-between p-2 text-sm">
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 019 14.437V9.564z"
                    />
                  </svg>
                  <div className="text-sm uppercase">Bundle</div>
                </div>
                <div className="font-bold">£{price!.value}</div>
              </div>
            </div>
          )}
          {bundle && <hr />}
          {c_nicotineStrength && (
            <div className="flex flex-col gap-2">
              <div className="text-sm font-semibold uppercase">
                CHOOSE NICOTINE LEVEL
              </div>
              <div className="font-semibold border w-full flex justify-between h-full items-center   ">
                {c_nicotineStrength.map((item, index: number) => (
                  <div
                    key={index}
                    className={` text-center m-auto h-full  w-full `}
                  >
                    <div
                      className={`flex justify-start ${
                        selectedStrength === index && `bg-black text-white`
                      }`}
                    >
                      <NicotineLevel
                        index={index}
                        level={item}
                        count={c_nicotineStrength.length}
                        setSelectedStrength={setSelectedStrength}
                      ></NicotineLevel>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {c_nicotineStrength && <hr />}
          {c_subscriptionPrice && c_subscriptionPrice.value && (
            <div className="flex flex-col gap-2">
              <div className="flex flex-col border">
                <div
                  onClick={() => setSubr(0)}
                  className={`font-semibold w-full ${
                    subscr === 0 ? `text-white bg-black` : `text-black bg-white`
                  } flex justify-between p-2 text-xs items-center`}
                >
                  <div className="flex gap-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 019 14.437V9.564z"
                      />
                    </svg>
                    One-Time Purchase
                  </div>
                  <div className="font-bold">£{price!.value}</div>
                </div>
              </div>
              <div className="flex flex-col border items-center">
                <div
                  onClick={() => setSubr(1)}
                  className={`font-semibold w-full items-center ${
                    subscr === 1 ? `text-white bg-black` : `text-black bg-white`
                  } flex justify-between p-2 text-xs `}
                >
                  <div className="flex gap-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 019 14.437V9.564z"
                      />
                    </svg>
                    <div>Subscribe from</div>
                  </div>
                  {c_subscriptionPrice!.value && (
                    <div className="font-bold">
                      £{c_subscriptionPrice!.value}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 text-sm font-semibold">
            <div className="flex justify-between rounded-full w-1/2 border-black border p-2 px-2">
              <div>-</div>
              <div>1</div>
              <div>+</div>
            </div>
            <div className=" w-1/2 items-center rounded-full bg-yellow-500 flex justify-center text-center mx-auto uppercase font-semibold text-xs">
              Add to basket
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default ProductCard;

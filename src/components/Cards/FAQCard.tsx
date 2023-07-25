import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import { useState } from "react";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import Faq from "../../types/faqs";
import RTF from "../RTF";

const FAQCard = (props: CardProps<Faq>): JSX.Element => {
  const { result } = props;
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="w-full border-b border-gray-300 p-4 my-4 ">
      <div className="text-xl">
        <div onClick={() => setIsActive(!isActive)}>
          <div className="text-primary-text-color text-2xl hover:cursor-pointer dark:text-dark_primary">
            <span>{result.name}</span>
            <div style={{ float: "right" }}>
              {isActive ? (
                <ChevronUpIcon className="w-7 text-[#083b3a]" />
              ) : (
                <ChevronDownIcon className="w-7 text-[#083b3a]" />
              )}
            </div>
          </div>
        </div>
        {isActive && (
          <div className="!text-lg text-faq-text-color mt-3 dark:text-dark_primary">
            <RTF>{result.rawData.answer}</RTF>
            <div className=" mt-4">
              <a
                href={result.rawData.landingPageUrl}
                className="px-6 py-2 w-fit group  relative text-lg  bg-[#99cb39] text-[#083b3a] font-bold "
              >
                Learn more
                <div className="h-1 bg-teal-900 absolute bottom-0 left-0 transition-width duration-75 group-hover:w-full"></div>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQCard;

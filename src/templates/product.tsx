/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import * as React from "react";
import PageLayout from "../components/page-layout";
import "../index.css";
import { Image } from "@yext/pages/components";
import RTF from "../components/RTF";
import { useState } from "react";
import NicotineLevel from "../components/Cards/nicotineLevel";
import { BsTruck } from "react-icons/bs";
import Favicon from "../assets/images/favicon.ico";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-2",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "photoGallery",
      "price",
      "slug",
      "bundle",
      "c_mixAndMatch",
      "c_nicotineStrength",
      "richTextDescription",
      "c_subscriptionPrice",
      "c_productType",
      "c_categories",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["product"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug ? document.slug : ` ${document.id.toString()}`;
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: relativePrefixToRoot + Favicon,
        },
      },
    ],
  };
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */
const Product: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    _site,
    name,
    photoGallery,
    price,
    bundle,
    c_mixAndMatch,
    c_nicotineStrength,
    c_subscriptionPrice,
    richTextDescription,
    c_productType,
    c_categories,
  } = document;

  const [subscr, setSubr] = useState(0);
  const [selectedStrength, setSelectedStrength] = useState(0);
  return (
    <>
      <PageLayout _site={_site}>
        <div className="centered-container max-w-3xl my-4 !p-0">
          <ul className="flex gap-4">
            <li>
              <a href="/products">Products</a>
            </li>
            <li className="separator">{">"}</li>
            <li>
              <a href={`/products/?query=${c_productType}`}>{c_productType}</a>
            </li>
            {c_categories && (
              <>
                <li className="separator">{">"}</li>
                <li>
                  <a href={`/products/?query=${c_categories}`}>
                    {c_categories}
                  </a>
                </li>
              </>
            )}
            <li className="separator">{">"}</li>
            <li className="font-semibold">{name}</li>
          </ul>
        </div>
        <div className="centered-container bg-white max-w-3xl mb-6 pt-8">
          <div className="flex gap-2">
            <div className="w-1/2">
              <Image image={photoGallery[0]}></Image>
            </div>
            <div className="w-1/2 py-8 flex flex-col space-y-6">
              <h1 className="font-bold text-2xl">{name}</h1>
              <div className="gap-y-4">
                <RTF>{richTextDescription.replaceAll("<br>", "<br><br>")}</RTF>
              </div>
              {bundle && (
                <div className="flex flex-col  gap-2">
                  <div className="  font-semibold  uppercase text-sm">
                    Bundle
                  </div>
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
              {c_nicotineStrength && (
                <div className="flex flex-col gap-2">
                  <div className="text-sm font-semibold uppercase">
                    CHOOSE NICOTINE LEVEL
                  </div>
                  <div className="font-semibold border w-full flex justify-between h-full items-center   ">
                    {c_nicotineStrength.map((item: any, index: number) => (
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
                        subscr === 0
                          ? `text-white bg-black`
                          : `text-black bg-white`
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
                        subscr === 1
                          ? `text-white bg-black`
                          : `text-black bg-white`
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
              <div className="flex w-full gap-3 text-sm items-center justify-between">
                <div className="w-1/2 flex flex-row gap-2">
                  <div>QUANTITY</div>
                  <div className="flex justify-between  w-20 ">
                    <div className="border rounded-full bg-gray-100  h-6 w-6 flex justify-center text-center">
                      -
                    </div>
                    <div>1</div>
                    <div className="border rounded-full bg-gray-100  h-6 w-6 flex justify-center text-center">
                      +
                    </div>
                  </div>
                </div>
                <div className=" w-1/2 items-center py-3 rounded-full bg-yellow-500 flex justify-center text-center mx-auto uppercase font-semibold text-xs">
                  Add to basket
                </div>
              </div>
              <div className="border px-4 py-2 w-full flex items-center gap-2">
                <BsTruck />
                <div className="text-xs font-semibold">
                  ORDER WITHIN 18 HRS 10 MINS 37 SECS FOR NEXT DAY DELIVERY.
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Product;

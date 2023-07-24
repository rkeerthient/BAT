/**
 * This is an example of how to create a static template that uses getStaticProps to retrieve data.
 */
import * as React from "react";
import "../index.css";
import {
  Template,
  GetPath,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import PageLayout from "../components/page-layout";
import ProductsGrid from "../wrappers/ProductsGrid";

export const config: TemplateConfig = {
  name: "products",
};

export const getPath: GetPath<TemplateProps> = () => {
  return `products`;
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct result from `getStaticProps`.
 */
const Static: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const { _site } = document;

  return (
    <>
      <PageLayout _site={_site}>
        <div className="max-w-7xl  mx-auto">
          <ProductsGrid></ProductsGrid>
        </div>
      </PageLayout>
    </>
  );
};

export default Static;

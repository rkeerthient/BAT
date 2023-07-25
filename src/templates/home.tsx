/**
 * This is an example of how to create a static template that uses getStaticProps to retrieve data.
 */
import * as React from "react";
import "../index.css";
import {
  Template,
  GetPath,
  TemplateConfig,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import PageLayout from "../components/page-layout";
import BlogPage from "../wrappers/BlogPage";
import { UniversalResults } from "@yext/search-ui-react";
import FAQCard from "../components/Cards/FAQCard";
import ProductCard from "../components/Cards/ProductCard";
import BlogCard from "../components/Cards/BlogCard";

export const config: TemplateConfig = {
  name: "home",
};
export const getPath: GetPath<TemplateRenderProps> = () => {
  return `index.html`;
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "BAT | Home",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};
const GridSection = ({ results, CardComponent, header }: any) => {
  if (!CardComponent) {
    return <div>Missing Card Component</div>;
  }
  return (
    <div>
      <div>{header}</div>
      <div className="grid grid-cols-2 gap-1 md:grid-cols-4 md:gap-8 ">
        {results.map((r: any, index: number) => (
          <CardComponent key={index} result={r} />
        ))}
      </div>
    </div>
  );
};
const BlogsWrapper: Template<TemplateRenderProps> = ({
  document,
}: TemplateRenderProps) => {
  const { _site } = document;

  return (
    <>
      <PageLayout _site={_site}>
        <div className="centered-container">
          <UniversalResults
            showAppliedFilters={true}
            customCssClasses={{
              universalResultsContainer: "w-full mx-auto my-12 ",
            }}
            verticalConfigMap={{
              faqs: {
                CardComponent: FAQCard,
                viewAllButton: true,
                label: "FAQs",
              },
              products: {
                CardComponent: ProductCard,
                SectionComponent: GridSection,
                label: "Products",
                viewAllButton: true,
              },
              // blog_details: {
              //   CardComponent: BlogCard,
              //   SectionComponent: GridSection,
              //   label: "Blogs",
              //   viewAllButton: true,
              // },
            }}
          />
        </div>
      </PageLayout>
    </>
  );
};
export default BlogsWrapper;

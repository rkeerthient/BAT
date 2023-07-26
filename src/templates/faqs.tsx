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
import { useState } from "react";
import FAQsPage from "../wrappers/FAQsPage";
import Favicon from "../assets/images/favicon.ico";

export const config: TemplateConfig = {
  name: "faqs",
};
export const getPath: GetPath<TemplateRenderProps> = () => {
  return `faqs`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: "VUSE | FAQs",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
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

const FAQsWrapper: Template<TemplateRenderProps> = ({
  document,
}: TemplateRenderProps) => {
  const { _site } = document;
  const [schemaData, setSchemaData] = useState();
  const handleDataFromChild = (data: any) => {
    setSchemaData(data);
  };
  return (
    <>
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}
      <PageLayout _site={_site}>
        <div className="centered-container">
          <FAQsPage sendDataToParent={handleDataFromChild} />
        </div>
      </PageLayout>
    </>
  );
};
export default FAQsWrapper;

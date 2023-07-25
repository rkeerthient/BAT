import { useSearchState } from "@yext/search-headless-react";
import { UniversalResults } from "@yext/search-ui-react";
import * as React from "react";
import FAQCard from "../components/Cards/FAQCard";
import ProductCard from "../components/Cards/ProductCard";
import Loader from "../components/Loader";

const HomePage = () => {
  const loading = useSearchState((state) => state.searchStatus.isLoading);
  const results = useSearchState((state) => state.universal.verticals) || 0;

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
  return (
    <div className="centered-container">
      {loading ? (
        <Loader></Loader>
      ) : (
        <>
          {results && results.length ? (
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
          ) : (
            <div className="space-y-4">
              <img src="https://i.imgur.com/LMlNrCZ.png" alt="" />
              <img src="https://i.imgur.com/UaHyInw.png" alt="" />
              <img src=" https://i.imgur.com/EjpvpVI.png" alt="" />
              <img src="https://i.imgur.com/Sm1sSHL.png" alt="" />
              <img src="https://i.imgur.com/dI1tjWi.png" alt="" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
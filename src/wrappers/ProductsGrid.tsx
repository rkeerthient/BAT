import { useSearchActions } from "@yext/search-headless-react";
import {
  StandardFacets,
  ResultsCount,
  AppliedFilters,
  Pagination,
  VerticalResults,
  LocationBias,
  StandardCard,
} from "@yext/search-ui-react";
import * as React from "react";
import { useEffect } from "react";
import ProductCard from "../components/Cards/ProductCard";

const ProductsGrid = () => {
  console.log("innn");

  const searchActions = useSearchActions();
  useEffect(() => {
    searchActions.setVertical("products");
    searchActions.executeVerticalQuery();
  }, []);
  return (
    <div className="flex mt-4">
      <div className="w-64 shrink-0 mr-5 mt-4">
        <StandardFacets />
      </div>
      <div className="w-full">
        <div className="flex flex-col items-baseline">
          <ResultsCount />
          <AppliedFilters />
        </div>
        <div className="flex flex-col space-y-4">
          <VerticalResults
            CardComponent={ProductCard}
            customCssClasses={{
              verticalResultsContainer: `grid grid-cols-3 gap-2`,
            }}
          />
          <div>
            <Pagination />
            <LocationBias />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsGrid;

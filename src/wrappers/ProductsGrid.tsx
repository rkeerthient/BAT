import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import {
  StandardFacets,
  ResultsCount,
  AppliedFilters,
  Pagination,
  VerticalResults,
  LocationBias,
} from "@yext/search-ui-react";
import * as React from "react";
import { useEffect } from "react";
import ProductCard from "../components/Cards/ProductCard";
import Loader from "../components/Loader";
import { AiOutlineArrowLeft } from "react-icons/ai";

const ProductsGrid = () => {
  const searchActions = useSearchActions();
  const loading = useSearchState((state) => state.searchStatus.isLoading);
  const inpQuery = useSearchState((state) => state.query.input);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get("query");
    query && searchActions.setQuery(query);
    searchActions.setVertical("products");
    searchActions.executeVerticalQuery();
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="mt-8 bg-yellow-500 w-fit px-4 py-2 rounded-full">
            <a
              href={`${inpQuery ? `/?query=${inpQuery}` : `/`}`}
              className="flex items-center gap-2"
            >
              <AiOutlineArrowLeft></AiOutlineArrowLeft> View Universal results
            </a>
          </div>
          <div className="flex mt-4">
            <div className="w-72  mr-5 ">
              <StandardFacets
                customCssClasses={{
                  standardFacetsContainer: "!mt-14  bg-white p-2",
                }}
              />
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
        </>
      )}
    </>
  );
};

export default ProductsGrid;

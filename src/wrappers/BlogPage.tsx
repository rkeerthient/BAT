import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import {
  ResultsCount,
  AppliedFilters,
  Pagination,
  VerticalResults,
  LocationBias,
  StandardFacets,
} from "@yext/search-ui-react";
import * as React from "react";
import { useEffect } from "react";
import BlogCard from "../components/Cards/BlogCard";
import Loader from "../components/Loader";

const BlogPage = () => {
  const searchActions = useSearchActions();
  const loading = useSearchState((state) => state.searchStatus.isLoading);
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get("query");
    query && searchActions.setQuery(query);
    searchActions.setVertical("blogs");
    searchActions.executeVerticalQuery();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex mt-4">
          <div className="w-72  mr-5 ">
            <StandardFacets
              customCssClasses={{
                standardFacetsContainer: "!mt-14  bg-white p-2",
              }}
            />
          </div>
          <div className="flex-grow">
            <div className="flex flex-col items-baseline">
              <ResultsCount />
              <AppliedFilters />
            </div>
            <VerticalResults
              CardComponent={BlogCard}
              customCssClasses={{
                verticalResultsContainer: `gap-1 grid grid-cols-1 md:grid-cols-3 `,
              }}
            />
            <Pagination />
            <LocationBias />
          </div>
        </div>
      )}
    </>
  );
};

export default BlogPage;

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
import FAQCard from "../components/Cards/FAQCard";

const FAQsPage = ({ sendDataToParent }: any) => {
  const searchActions = useSearchActions();
  const faqResults = useSearchState((state) => state.vertical.results) || [];
  const loadingState =
    useSearchState((state) => state.searchStatus.isLoading) || true;

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get("query");
    query && searchActions.setQuery(query);
    searchActions.setVertical("faqs");
    searchActions.executeVerticalQuery();
  }, []);

  useEffect(() => {
    if (loadingState && faqResults.length >= 1) {
      let mEntity: any = [];
      faqResults.map((item: any) =>
        mEntity.push({
          "@type": "Question",
          name: item.rawData.name,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.rawData.answer,
          },
        })
      );
      sendDataToParent({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: mEntity,
      });
    }
  }, [faqResults, loadingState]);

  return (
    <>
      <div className="flex mt-4">
        <div className="w-64 shrink-0 mr-5 mt-4">
          <StandardFacets />
        </div>
        <div className="flex-grow">
          <div className="flex flex-col items-baseline">
            <ResultsCount />
            <AppliedFilters />
          </div>
          <VerticalResults
            CardComponent={FAQCard}
            customCssClasses={{
              verticalResultsContainer: `max-w-screen-xl`,
            }}
          />
          <Pagination />
          <LocationBias />
        </div>
      </div>
    </>
  );
};

export default FAQsPage;

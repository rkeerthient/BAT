import * as React from "react";
import {
  DropdownItem,
  FocusedItemData,
  RenderEntityPreviews,
  SearchBar,
} from "@yext/search-ui-react";
import {
  provideHeadless,
  useSearchActions,
  VerticalResults as VerticalResultsData,
  useSearchState,
} from "@yext/search-headless-react";
import { useEffect } from "react";
import searchConfig from "./searchConfig";
import Product from "../types/products";
import { Image } from "@yext/react-components";

type Link = {
  label: string;
  url: string;
};

const links: Link[] = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "Products",
    url: "/products",
  },
  {
    label: "Blogs",
    url: "/blogs",
  },
  {
    label: "FAQs",
    url: "/faqs",
  },
  {
    label: "Locations",
    url: "/locations",
  },
];

const Header = () => {
  const state = useSearchState((state) => state.vertical.verticalKey);
  const searchActions = useSearchActions();
  const [path, setPath] = React.useState("");
  React.useEffect(() => {
    const currentPath = window.location.pathname;
    setPath(currentPath);
    return () => {};
  }, []);
  useEffect(() => {
    (path === "home" || !path) && searchActions.setUniversal();
  }, []);
  const linkDoms = links.map((link) => (
    <div key={link.label}>
      <a href={link.url} rel="noreferrer">
        {link.label}
      </a>
    </div>
  ));
  useEffect(() => {
    const currentPath = window.location.pathname;
    setPath(currentPath);
    return () => {};
  }, []);
  const entityPreviewSearcher = provideHeadless({
    ...searchConfig,
    headlessId: "entity-preview-searcher",
  });

  const renderEntityPreviews: RenderEntityPreviews = (
    autocompleteLoading: boolean,
    verticalKeyToResults: Record<string, VerticalResultsData>,
    dropdownItemProps: {
      onClick: (
        value: string,
        _index: number,
        itemData?: FocusedItemData
      ) => void;
      ariaLabel: (value: string) => string;
    }
  ): JSX.Element | null => {
    const productResults = verticalKeyToResults["products"]?.results.map(
      (result) => result.rawData
    ) as unknown as Product[];

    return productResults ? (
      <div className="grid grid-cols-4 px-2 gap-2 text-black">
        {productResults.map((result) => (
          <DropdownItem
            className="border gap-2"
            key={result.id}
            value={result.name}
            onClick={() => history.pushState(null, "", `/product/${result.id}`)}
            ariaLabel={dropdownItemProps.ariaLabel}
          >
            <DropdownItem
              key={result.id}
              value={result.name}
              ariaLabel={dropdownItemProps.ariaLabel}
            >
              <a href={result.slug} className="flex flex-col gap-2 ">
                {result.photoGallery && (
                  <Image
                    image={result.photoGallery[0]}
                    className="h-full w-32 mx-auto"
                  />
                )}
                <div className="flex gap-2 px-1">
                  <div className="text-sm">{result.name}</div>
                  <div className="text-sm">£{result.price?.value}</div>
                </div>
              </a>
            </DropdownItem>
          </DropdownItem>
        ))}
      </div>
    ) : null;
  };
  return (
    <>
      <div className="bg-black text-white px-8">
        <nav className="py-6 flex flex-col items-center justify-between w-full">
          <div className="  font-semibold flex flex-row justify-between w-full">
            <img
              src="https://i.imgur.com/WCKxz4Y.png"
              alt=""
              className="w-36"
            />
            <div className="w-1/2">
              {!state || state === "products" ? (
                path && !path.includes("product-grid") ? (
                  <SearchBar
                    hideRecentSearches={true}
                    customCssClasses={{ searchBarContainer: "!mb-0" }}
                    visualAutocompleteConfig={{
                      entityPreviewSearcher: entityPreviewSearcher,
                      includedVerticals: ["products"],
                      renderEntityPreviews: renderEntityPreviews,
                      universalLimit: { products: 4 },
                      entityPreviewsDebouncingTime: 300,
                    }}
                  />
                ) : (
                  <SearchBar
                    hideRecentSearches={true}
                    customCssClasses={{ searchBarContainer: "!mb-0" }}
                    visualAutocompleteConfig={{
                      entityPreviewSearcher: entityPreviewSearcher,
                      includedVerticals: ["products"],
                      renderEntityPreviews: renderEntityPreviews,
                      universalLimit: { products: 4 },
                      entityPreviewsDebouncingTime: 300,
                    }}
                  />
                )
              ) : (
                <SearchBar
                  customCssClasses={{ searchBarContainer: "!mb-0" }}
                  hideRecentSearches={true}
                />
              )}
            </div>
          </div>
          <div className="flex flex-row justify-start !gap-x-20 text-lg font-semibold w-full">
            {linkDoms}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;

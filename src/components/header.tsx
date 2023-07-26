import * as React from "react";
import {
  DropdownItem,
  FocusedItemData,
  RenderEntityPreviews,
  SearchBar,
  onSearchFunc,
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
import { useMyContext } from "./context/context";
import SpeechToText from "./SpeechToText";
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
  const { setNoData } = useMyContext();
  const noResContext = {
    noResults: true,
  };

  const handleDataFromChild = (data: any, listenStatus: any) => {
    data && searchActions.setQuery(data);
    !listenStatus && !state
      ? (searchActions.setUniversal(), searchActions.executeUniversalQuery())
      : (searchActions.setVertical(state!),
        searchActions.executeVerticalQuery());
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    (path === "home" || !path) && searchActions.setUniversal(),
      searchActions.setUniversalLimit({
        faqs: 5,
        products: 12,
        locations: 5,
        blogs: 5,
        blog_details: 4,
      });
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

  const handleSearch: onSearchFunc = (searchEventData) => {
    const { query } = searchEventData;
    searchActions.setQuery(query!);
    state
      ? (searchActions.setVertical(state), searchActions.executeVerticalQuery())
      : (setNoData(false),
        searchActions.setUniversal(),
        searchActions.setUniversalLimit({
          faqs: 5,
          products: 12,
          locations: 5,
          blogs: 5,
          blog_details: 4,
        }),
        searchActions.executeUniversalQuery().then((res) => {
          !res!.verticalResults.length
            ? (searchActions.setContext(noResContext),
              searchActions.setUniversalLimit({
                faqs: 0,
                products: 12,
                locations: 0,
                blogs: 0,
                blog_details: 0,
              }),
              searchActions.executeUniversalQuery(),
              setNoData(true))
            : console.log(res);
        }));
  };

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
              <div className="w-full flex bg-white gap-2 items-center pr-3">
                {!state || state === "products" ? (
                  <SearchBar
                    hideRecentSearches={true}
                    customCssClasses={{
                      searchBarContainer: "!mb-0 flex-1 searchBar",
                      searchButton: "text-black",
                    }}
                    visualAutocompleteConfig={{
                      entityPreviewSearcher: entityPreviewSearcher,
                      includedVerticals: ["products"],
                      renderEntityPreviews: renderEntityPreviews,
                      universalLimit: { products: 4 },
                      entityPreviewsDebouncingTime: 300,
                    }}
                    onSearch={handleSearch}
                  />
                ) : (
                  <SearchBar
                    customCssClasses={{
                      searchBarContainer: "!mb-0 flex-1 searchBar",
                      searchButton: "text-black searchBar",
                    }}
                    hideRecentSearches={true}
                  />
                )}
                <div className="w-fit text-black">
                  <SpeechToText
                    sendDataToParent={handleDataFromChild}
                  ></SpeechToText>
                </div>
              </div>
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

import {
  useSearchActions,
  useSearchState,
  SelectableStaticFilter,
  Matcher,
} from "@yext/search-headless-react";
import {
  OnDragHandler,
  SearchBar,
  ResultsCount,
  AppliedFilters,
  Pagination,
  MapboxMap,
  VerticalResults,
  LocationBias,
  Coordinate,
  MapboxMapProps,
} from "@yext/search-ui-react";
import { LngLat, LngLatBounds } from "mapbox-gl";
import * as React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import LocationCard from "../components/Cards/LocationCard";
import MapPin from "../components/MapPin";

export interface Location {
  yextDisplayCoordinate?: Coordinate;
}

const mapboxOptions: MapboxMapProps<Location>["mapboxOptions"] = {
  zoom: 10,
};
const LocationPage = () => {
  const searchActions = useSearchActions();
  const filters = useSearchState((state) => state.filters.static);
  const [loading, setLoading] = React.useState(true);
  const isLoading =
    useSearchState((state) => state.searchStatus.isLoading) || false;

  React.useLayoutEffect(() => {
    searchActions.setVertical("locations");
    searchActions.executeVerticalQuery().then(() => setLoading(false));
  }, [searchActions]);

  const onDrag: OnDragHandler = React.useCallback(
    (center: LngLat, bounds: LngLatBounds) => {
      const radius = center.distanceTo(bounds.getNorthEast());
      const nonLocationFilters: SelectableStaticFilter[] =
        filters?.filter(
          (f) =>
            f.filter.kind !== "fieldValue" ||
            f.filter.fieldId !== "builtin.location"
        ) ?? [];
      const nearFilter: SelectableStaticFilter = {
        selected: true,
        displayName: "Near Current Area",
        filter: {
          kind: "fieldValue",
          fieldId: "builtin.location",
          matcher: Matcher.Near,
          value: { ...center, radius },
        },
      };
      searchActions.setStaticFilters([...nonLocationFilters, nearFilter]);
      searchActions.executeVerticalQuery();
    },
    [filters, searchActions]
  );

  return (
    <>
      {!isLoading && (
        <div>
          <div className="flex flex-row">
            <div
              className="flex flex-col w-2/5  p-4 overflow-scroll"
              style={{ height: "95vh" }}
            >
              <ResultsCount />
              <AppliedFilters />
              <div className="bg-white p-2">
                FIND A STORE NEAR YOU Looking for Vuse products near you? Simply
                enter your location or postcode into the search bar, and we'll
                provide you with a list of nearby Vuse stockists, including
                major retailers like Asda, Boots, Tesco, Sainsbury’s and Co-op.
                Discover a list of local shops and stores in just a few clicks
                that carry our range of vape kits, disposables, pods and refills
                to help meet your vaping needs in cities including Edinburgh
                Leeds London Manchester Sheffield Our locator will also guide
                you to Vuse drop-off stations where we will try and find a more
                sustainable way to dispose of your old pods and devices, to
                prevent them from ending up in landfill. Read more on our
                sustainability journey here.
              </div>
              <VerticalResults
                CardComponent={LocationCard}
                customCssClasses={{
                  verticalResultsContainer: "flex flex-col gap-2",
                }}
              />
              <Pagination />
              <LocationBias />
            </div>
            <div className=" w-3/5 h-screen">
              <MapboxMap
                mapboxAccessToken={
                  "pk.eyJ1Ijoic3VubnlrZWVydGhpIiwiYSI6ImNsNWh5ZGt3czAyejUzY3A3Y3pvZ2E0bTgifQ.TNHfh1HL0LwTzLxs2TOaBQ"
                }
                mapboxOptions={mapboxOptions}
                PinComponent={MapPin}
                onDrag={onDrag}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LocationPage;

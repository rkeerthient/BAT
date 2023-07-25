import * as React from "react";
import { CardComponent } from "@yext/search-ui-react";

const metersToMiles = (meters: number) => {
  const miles = meters * 0.000621371;
  return miles.toFixed(2);
};

const LocationCard: CardComponent<any> = ({ result }) => {
  const { address } = result.rawData;
  var gmaps = "https://www.google.com/maps/dir/?api=1&destination=";
  var gmapsAddress = gmaps.concat(
    address.line1,
    " ",
    address.city,
    " ",
    address.region,
    " ",
    address.postalCode
  );
  var gmapsLink = gmapsAddress.concat('"');

  return (
    <div className="p-8 border-2 border-transparent hover:border-2  border-[#f1f1f1] hovCards  ">
      <a target="_blank" className="space-y-6 hover:cursor-pointer">
        <h1 className="text-slate-700 font-semibold text-lg flex justify-between">
          <div>{result.rawData.name}</div>
          <div className=" italic ">
            {metersToMiles(result.distance ?? 0)} mi
          </div>
        </h1>
        <div className="flex font-light">
          <p className="  text-slate-700">
            {`${Object.values(address)
              .filter((value) => value) // Filter out falsy (empty, null, undefined) values
              .join(", ")}`}
          </p>
        </div>
        <div className="mt-4 w-full   rounded-full !px-6 !py-3 uppercase font-semibold border-2">
          <a
            target="_blank"
            href={gmapsLink}
            className="CTA-1   hover:underline mx-auto flex justify-center"
          >
            Get Directions
          </a>
        </div>
      </a>
    </div>
  );
};

export default LocationCard;

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
    <div className="p-4 border-2 border-transparent hover:border-2  border-[#f1f1f1] hovCards  ">
      <a target="_blank" className="space-y-6 hover:cursor-pointer">
        <h1 className="text-slate-900 text-lg">{result.rawData.name}</h1>
        <div className="flex">
          <p className="  text-slate-700">{address.line1}</p>
          <p className="  text-slate-700">
            {address.city}, {address.region}, {address.postalCode}{" "}
          </p>
          {/* <p className="mt-1 text-xs italic text-slate-500">
            {metersToMiles(result.distanceFromFilter ?? 0)} mi
          </p> */}
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

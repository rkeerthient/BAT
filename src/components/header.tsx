import * as React from "react";
import Cta from "../components/cta";
import { SearchBar } from "@yext/search-ui-react";
import { useSearchActions } from "@yext/search-headless-react";
import { useEffect } from "react";

type Link = {
  label: string;
  url: string;
};

const links: Link[] = [
  {
    label: "Home",
    url: "/home",
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

  return (
    <>
      <div className="centered-container">
        <nav className="py-6 flex items-center justify-between">
          <div className="text-2xl font-semibold">IQOS</div>
          <div className="flex gap-x-10 text-lg font-semibold">{linkDoms}</div>
          <SearchBar></SearchBar>
        </nav>
      </div>
    </>
  );
};

export default Header;

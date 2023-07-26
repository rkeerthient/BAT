import * as React from "react";
import Header from "./header";
import Footer from "./footer";
import {
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import searchConfig from "./searchConfig";
import { MyContextProvider } from "./context/context";

type Props = {
  _site: any;
  children?: React.ReactNode;
};
const searcher = provideHeadless(searchConfig);
const PageLayout = ({ _site, children }: Props) => {
  return (
    <MyContextProvider>
      <SearchHeadlessProvider searcher={searcher}>
        <div className="min-h-screen bg-[#f1f1f1]">
          <Header _site={_site} />
          {children}
          <Footer _site={_site}></Footer>
        </div>
      </SearchHeadlessProvider>
    </MyContextProvider>
  );
};

export default PageLayout;

import React from "react";
import { SearchModalContextProvider } from "../context/SearchModalContextProvider";
import GlobalStyles from "../styles/GlobalStyles";
import Header from "./Header";
import Search from "./search/SearchModal";
import Footer from "./Footer";

const Layout = ({ children }) => {
  if (children.key === "/404.html") {
    return (
      <SearchModalContextProvider>
        <GlobalStyles />
        <Search />
        <Header />
        <main>{children}</main>
      </SearchModalContextProvider>
    );
  }
  return (
    <SearchModalContextProvider>
      <GlobalStyles />
      <Search />
      <Header />
      <main>{children}</main>
      <Footer />
    </SearchModalContextProvider>
  );
};

export default Layout;

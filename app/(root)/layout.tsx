import Header from "@/components/common/header";
import React from "react";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <header>
        <Header />
      </header>

      <main>{children}</main>
    </>
  );
};

export default Layout;

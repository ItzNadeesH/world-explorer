import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import React from "react";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <div className="relative min-h-screen flex flex-col">
        <header>
          <Header />
        </header>

        <main className="flex-1">{children}</main>

        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Layout;

import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className=" w-full bottom-0 max-w-7xl mx-auto py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} WorldInfo. All rights reserved.
        </p>
        <p className="text-sm text-muted-foreground">
          Data provided by{" "}
          <Link
            href="https://restcountries.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            REST Countries API
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;

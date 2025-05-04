"use client";

import { FormEvent, useEffect, useState } from "react";
import { Country } from "@/types/country";
import Image from "next/image";
import CountryCard from "@/components/CountryCard";
import Spinner from "@/components/Spinner";

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("api/countries");
    const data = await res.json();
    setCountries(data);
    setLoading(false);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto mt-2 lg:mt-10 p-5 space-y-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <Image src="/logo.svg" alt="logo" width={64} height={64} className="mx-auto" />
          <h1 className="text-4xl font-bold tracking-tight">World Explorer</h1>
          <p className="text-gray-600 max-w-[600px]">
            Discover detailed information about countries around the world. Search by name to learn
            about their capitals, populations, and more.
          </p>
        </div>

        {/* Search Bar */}
        <div>
          <Search setResult={setCountries} setLoading={setLoading} />
        </div>

        {/* Countries Grid  */}
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {countries.map((country, index) => (
              <CountryCard key={index} country={country} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

const Search = ({
  setResult,
  setLoading,
}: {
  setResult: (countries: Country[]) => void;
  setLoading: (loading: boolean) => void;
}) => {
  const [query, setQuery] = useState<string>("");

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`api/countries/search?q=${query}`);
    const data = await res.json();

    setResult(data);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="flex max-w-2xl border-2 mx-auto rounded-full px-2">
        <Image src="/logo.svg" alt="logo" width={24} height={24} className="mx-auto" />

        <input
          type="text"
          placeholder="Search"
          className="w-full px-2 py-2 outline-0 font-semibold"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button type="submit" className="w-10 cursor-pointer rounded-full">
          <Image src="/search.svg" alt="logo" width={24} height={24} className="mx-auto" />
        </button>
      </div>
    </form>
  );
};

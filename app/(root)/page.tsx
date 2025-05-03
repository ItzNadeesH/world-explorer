"use client";

import { FormEvent, useEffect, useState } from "react";
import { Country } from "@/types/country";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("api/countries");
    const data = await res.json();

    setCountries(data);
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
          <Search setResult={setCountries} />
        </div>

        {/* Countries Grid  */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {countries.map((country, index) => (
            <CountryCard key={index} country={country} />
          ))}
        </div>
      </div>
    </>
  );
}

const Search = ({ setResult }: { setResult: (countries: Country[]) => void }) => {
  const [query, setQuery] = useState<string>("");

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch(`api/countries/search?q=${query}`);
    const data = await res.json();

    setResult(data);
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

const CountryCard = ({ country }: { country: Country }) => {
  return (
    <div className="relative border border-gray-300 shadow-sm rounded-lg">
      <button className="flex absolute right-4 text-red-500 top-4 cursor-pointer bg-white/90 hover:bg-white transition-all p-2 rounded-full shadow-lg">
        <Heart height={16} width={16} color="black" />
      </button>
      <div>
        <img src={country.flags.png} alt="country-flag" className="w-full h-[180px] rounded-t-lg" />
      </div>
      <div className="p-4">
        <div className="mb-1 flex justify-between items-baseline">
          <h4 className="font-semibold">{country.name.common}</h4>
          <p className="font-semibold text-sm">{country.region}</p>
        </div>
        <div className="flex justify-between items-baseline">
          <div>
            <p className="font-meidum text-sm">Population</p>
            <p className="font-medium text-sm text-gray-500">
              {country.population.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="font-meidum text-sm text-right">Capital</p>
            <p className=" text-sm text-right text-gray-500">{country.capital}</p>
          </div>
        </div>
        <Link
          href={`/country/${country.cca3}`}
          className="mt-2 flex justify-center items-center gap-2 w-full py-2 font-medium bg-black text-sm text-white rounded-sm cursor-pointer"
        >
          <span>View Details</span>
          <Image src="/external-link.svg" alt="logo" width={18} height={18} />
        </Link>
      </div>
    </div>
  );
};

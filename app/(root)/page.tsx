"use client";

import { FormEvent, useEffect, useState } from "react";
import { Country } from "@/types/country";
import Image from "next/image";
import CountryCard from "@/components/CountryCard";
import Spinner from "@/components/Spinner";
import Dropdown from "@/components/Dropdown";
import { regions } from "@/constants/regions";
import { languages } from "@/constants/languages";

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("api/countries");
    const data = await res.json();
    setCountries(data);
    setLoading(false);
  };

  useEffect(() => {
    let filtered = countries;

    if (selectedRegion) {
      filtered = filtered.filter((country) => country.region === selectedRegion);
    }

    if (selectedLanguage) {
      filtered = filtered.filter((country) => {
        const langs = country.languages ? Object.values(country.languages) : [];
        return langs.some((lang: string) =>
          lang.toLowerCase().includes(selectedLanguage.toLowerCase())
        );
      });
    }

    setFilteredCountries(filtered);
  }, [countries, selectedRegion, selectedLanguage]);

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
        <div className="flex flex-col lg:flex-row justify-center items-center gap-2">
          <Search setResult={setCountries} setLoading={setLoading} />
          <div className="flex flex-col lg:flex-row items-center gap-2 w-full">
            <Dropdown
              label="Select Region"
              options={regions}
              selected={selectedRegion}
              onSelect={(region) => setSelectedRegion(region)}
            />

            <Dropdown
              label="Select Language"
              options={languages}
              selected={selectedLanguage}
              onSelect={(language) => setSelectedLanguage(language)}
            />

            <button
              onClick={() => {
                setSelectedRegion(null);
                setSelectedLanguage(null);
                setFilteredCountries(countries);
              }}
              className="w-full text-sm border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-md cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Countries Grid  */}
        {loading ? (
          <Spinner />
        ) : filteredCountries.length === 0 ? (
          <div className="mt-10 col-span-full text-center text-gray-600">
            No countries found based on your filter criteria.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCountries.map((country, index) => (
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

    const res = query
      ? await fetch(`api/countries/search?q=${query}`)
      : await fetch("api/countries");

    const data = await res.json();

    setResult(data);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
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

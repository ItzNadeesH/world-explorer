"use client";

import CountryCard from "@/components/CountryCard";
import Spinner from "@/components/Spinner";
import { Country } from "@/types/country";
import React, { useEffect, useState } from "react";

const Favorites = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("api/countries/favorites");
    const data = await res.json();
    setCountries(data);
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto mt-2 p-5 space-y-8">
      <h2 className="text-2xl font-semibold">Favorites</h2>

      {loading ? (
        <Spinner />
      ) : countries.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {countries.map((country, index) => (
            <CountryCard key={index} country={country} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No Favorites Found!</div>
      )}
    </div>
  );
};

export default Favorites;

"use client";

import React, { useEffect, useState } from "react";
import { Clock, Globe, LandPlot, Languages, MapPin, Users } from "lucide-react";
import { Country } from "@/types/country";
import { useParams } from "next/navigation";
import Spinner from "@/components/Spinner";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

export default function CountryDetails() {
  const params = useParams();
  const code = params?.code as string;
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);

  console.log(country);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/countries/${code}`);
      const data = await res.json();
      setCountry(data);
    } catch (error) {
      console.error("Failed to fetch country data", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return country ? (
    <div className="max-w-7xl mx-auto mt-2 p-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-1 border border-gray-300 rounded-lg shadow-lg">
          <div className="rounded-lg overflow-hidden">
            <img
              src={country.flags?.png || country.flags?.svg}
              alt="flag"
              className="w-full h-auto"
            />
            <div className="p-6">
              <h2 className="text-3xl font-bold text-gray-800">{country.name.common}</h2>
              <p className="font-semibold text-gray-800 mb-2">{country.name.official}</p>
              <h3 className="text-lg text-gray-900 font-semibold my-2">Additional Information</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-gray-600 font-semibold">Driving Side: </span>
                  <span className="text-sm font-semibold">{country.car.side || "N/A"}</span>
                </div>
                <div>
                  <span className="text-gray-600 font-semibold">Start of Week: </span>
                  <span className="text-sm font-semibold">
                    {country.startOfWeek
                      ? `${country.startOfWeek.charAt(0).toUpperCase()}${country.startOfWeek.slice(
                          1
                        )}`
                      : "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 font-semibold">Independant: </span>
                  <span className="text-sm font-semibold">
                    {country.independent !== undefined
                      ? country.independent
                        ? "Yes"
                        : "No"
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 p-6 border border-gray-300 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-300">
                Geography
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <MapPin size={20} className="mr-2 min-w-[20px] text-gray-600" />
                  <div>
                    <span className="text-gray-600 font-semibold">Capital:</span>{" "}
                    <span className="text-sm font-semibold">
                      {country.capital?.join(", ") || "N/A"}
                    </span>
                  </div>
                </li>
                <li className="flex items-center">
                  <Globe size={20} className="mr-2 min-w-[20px] text-gray-600" />
                  <div>
                    <span className="text-gray-600 font-semibold">Region:</span>{" "}
                    <span className="text-sm font-semibold">
                      {country.region} ({country.subregion})
                    </span>
                  </div>
                </li>
                <li className="flex items-center">
                  <LandPlot size={20} className="mr-2 min-w-[20px] text-gray-600" />
                  <div>
                    <span className="text-gray-600 font-semibold">Area:</span>{" "}
                    <span className="text-sm font-semibold">
                      {(country.area || 0).toLocaleString()} km²
                    </span>
                  </div>
                </li>
                <li className="flex items-center">
                  <MapPin size={20} className="mr-2 min-w-[20px] text-gray-600" />
                  <div>
                    <span className="text-gray-600 font-semibold">Borders:</span>{" "}
                    <span className="text-sm font-semibold">
                      {country.borders?.join(", ") || "None"}
                    </span>
                  </div>
                </li>
                <li className="flex items-center">
                  <Clock size={20} className="mr-2 min-w-[20px] text-gray-600" />
                  <div>
                    <span className="text-gray-600 font-semibold">Timezones:</span>{" "}
                    <span className="text-sm font-semibold">{country.timezones?.join(", ")}</span>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-300">
                Demographics & Culture
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Users size={20} className="mr-2 min-w-[20px] text-gray-600" />
                  <div>
                    <span className="text-gray-600 font-semibold">Population:</span>{" "}
                    <span className="text-sm font-semibold">
                      {country.population.toLocaleString()}
                    </span>
                  </div>
                </li>
                <li className="flex items-center">
                  <Languages size={20} className="mr-2 min-w-[20px] text-gray-600" />
                  <div>
                    <span className="text-gray-600 font-semibold">Languages:</span>{" "}
                    <span className="text-sm font-semibold">
                      {country.languages ? Object.values(country.languages).join(", ") : "N/A"}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-300">Map</h3>
            <div className="h-64 overflow-hidden rounded-lg">
              <iframe
                title="Map of the country"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${country.name.common}`}
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="text-center text-gray-600 mt-10">Country not found</div>
  );
}

import { Country } from "@/types/country";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const CountryCard = ({ country }: { country: Country }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const toggleFavorite = () => {
    country.isFavorite = !isFavorite;
    setIsFavorite(!isFavorite);
  };
  return (
    <div className="relative border border-gray-300 shadow-sm rounded-lg">
      <button
        onClick={toggleFavorite}
        className="flex absolute right-4 text-red-500 top-4 cursor-pointer bg-white/90 hover:bg-white transition-all p-2 rounded-full shadow-lg"
      >
        {isFavorite ? (
          <Heart height={16} width={16} color="red" fill="red" />
        ) : (
          <Heart height={16} width={16} color="black" />
        )}
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

export default CountryCard;

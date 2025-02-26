"use client";
import { useRouter } from "next/navigation";

const dummyCountries: Record<
  string,
  {
    name: string;
    flag: string;
    population: number;
    area: number;
    region: string;
  }
> = {
  "1": {
    name: "United States",
    flag: "🇺🇸",
    population: 331000000,
    area: 9834000,
    region: "Americas",
  },
  "2": {
    name: "Canada",
    flag: "🇨🇦",
    population: 38000000,
    area: 9985000,
    region: "Americas",
  },
  "3": {
    name: "Germany",
    flag: "🇩🇪",
    population: 83000000,
    area: 357000,
    region: "Europe",
  },
  "4": {
    name: "India",
    flag: "🇮🇳",
    population: 1380000000,
    area: 3287000,
    region: "Asia",
  },
};

export default function CountryDetails({ params }: { params: { id: string } }) {
  const router = useRouter();
  const country = dummyCountries[params.id];

  if (!country) {
    return <div className="p-6 text-red-500 text-lg">Country not found.</div>;
  }

  return (
    <div className="p-6">
      <button
        onClick={() => router.push("/countries")}
        className="mb-4 px-4 py-2 bg-gray-300 rounded"
      >
        ⬅ Go Back
      </button>
      <h1 className="text-2xl font-semibold mb-4">{country.name}</h1>
      <div className="border p-4 rounded-md shadow-md">
        <p className="text-5xl">{country.flag}</p>
        <p className="text-lg">
          <strong>Population:</strong> {country.population.toLocaleString()}
        </p>
        <p className="text-lg">
          <strong>Area:</strong> {country.area.toLocaleString()} km²
        </p>
        <p className="text-lg">
          <strong>Region:</strong> {country.region}
        </p>
      </div>
    </div>
  );
}

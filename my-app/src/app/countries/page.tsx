"use client";

import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      emoji
      capital
      currency
      languages {
        name
      }
    }
  }
`;

type Country = {
  code: string;
  name: string;
  emoji: string;
  capital: string;
  currency: string;
  languages: { name: string }[];
};

export default function CountriesPage() {
  const [search, setSearch] = useState("");
  const [selectedCountry1, setSelectedCountry1] = useState<string | null>(null);
  const [selectedCountry2, setSelectedCountry2] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const router = useRouter();

  const { data, loading, error } = useQuery(GET_COUNTRIES);

  if (loading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader className="my-auto animate-spin mx-auto" />;
      </div>
    );
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  const countries = data?.countries || [];

  const filteredCountries = countries.filter((country: Country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);
  const displayedCountries = filteredCountries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelect = (code: string) => {
    router.push(`/countries/${code}`);
  };

  return (
    <div className="p-6">
      {/* Top Bar with Logout */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Countries List</h1>
        <Button onClick={() => console.log("Logout Clicked")}>Logout</Button>
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for a country..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border rounded-md"
      />
      {/* Country Comparison Select */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Compare Two Countries</h2>
        <div className="flex gap-4">
          <select
            className="p-2 border rounded-md w-1/2"
            value={selectedCountry1 || ""}
            onChange={(e) => setSelectedCountry1(e.target.value)}
          >
            <option value="">Select First Country</option>
            {countries.map((country: Country) => (
              <option key={country.code} value={country.code}>
                {country.emoji} {country.name}
              </option>
            ))}
          </select>

          <select
            className="p-2 border rounded-md w-1/2"
            value={selectedCountry2 || ""}
            onChange={(e) => setSelectedCountry2(e.target.value)}
          >
            <option value="">Select Second Country</option>
            {countries.map((country: Country) => (
              <option key={country.code} value={country.code}>
                {country.emoji} {country.name}
              </option>
            ))}
          </select>
        </div>

        {selectedCountry1 && selectedCountry2 && (
          <div className="mt-4 p-4 border rounded-md bg-gray-100">
            <h3 className="text-lg font-semibold">Comparison:</h3>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Attribute</th>
                  <th className="border p-2">
                    {
                      countries.find(
                        (c: Country) => c.code === selectedCountry1
                      )?.name
                    }
                  </th>
                  <th className="border p-2">
                    {
                      countries.find(
                        (c: Country) => c.code === selectedCountry2
                      )?.name
                    }
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 font-semibold">Flag</td>
                  <td className="border p-2">
                    {
                      countries.find(
                        (c: Country) => c.code === selectedCountry1
                      )?.emoji
                    }
                  </td>
                  <td className="border p-2">
                    {
                      countries.find(
                        (c: Country) => c.code === selectedCountry2
                      )?.emoji
                    }
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">Capital</td>
                  <td className="border p-2">
                    {countries.find((c: Country) => c.code === selectedCountry1)
                      ?.capital || "N/A"}
                  </td>
                  <td className="border p-2">
                    {countries.find((c: Country) => c.code === selectedCountry2)
                      ?.capital || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">Currency</td>
                  <td className="border p-2">
                    {countries.find((c: Country) => c.code === selectedCountry1)
                      ?.currency || "N/A"}
                  </td>
                  <td className="border p-2">
                    {countries.find((c: Country) => c.code === selectedCountry2)
                      ?.currency || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">Languages</td>
                  <td className="border p-2">
                    {countries
                      .find((c: Country) => c.code === selectedCountry1)
                      ?.languages.map((lang: Country) => lang.name)
                      .join(", ") || "N/A"}
                  </td>
                  <td className="border p-2">
                    {countries
                      .find((c: Country) => c.code === selectedCountry2)
                      ?.languages.map((lang: Country) => lang.name)
                      .join(", ") || "N/A"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Countries Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Flag</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Capital</th>
              <th className="border p-2">Currency</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedCountries.map((country: Country) => (
              <tr key={country.code} className="text-center hover:bg-gray-100">
                <td className="border p-2">{country.emoji}</td>
                <td className="border p-2 font-semibold">{country.name}</td>
                <td className="border p-2">{country.capital}</td>
                <td className="border p-2">{country.currency}</td>
                <td className="border p-2">
                  <Button onClick={() => handleSelect(country.code)}>
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-lg font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

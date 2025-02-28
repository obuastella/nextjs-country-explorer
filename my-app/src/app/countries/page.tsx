"use client";

import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      emoji
    }
  }
`;

type Country = {
  code: string;
  name: string;
  emoji: string;
};

export default function CountriesPage() {
  const [search, setSearch] = useState("");
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10; // Display 10 countries per page
  const router = useRouter();

  // Fetch countries from GraphQL API
  const { data, loading, error } = useQuery(GET_COUNTRIES);

  if (loading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader className="animate-spin mx-auto" />;
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  const countries = data?.countries || [];

  // Handle country selection
  const handleSelect = (code: string) => {
    setSelectedCountries((prev) =>
      prev.includes(code)
        ? prev.filter((c) => c !== code)
        : prev.length < 2
        ? [...prev, code]
        : prev
    );
  };

  // Get selected country data
  const selectedData = countries.filter((country: Country) =>
    selectedCountries.includes(country.code)
  );

  // Filter countries based on search
  const filteredCountries = countries.filter((country: Country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);
  const paginatedCountries = filteredCountries.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleLogout = () => {
    toast.success("Logged out successfully");
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  return (
    <div className="p-6">
      <Toaster position="top-right" richColors />
      <div className="flex w-full justify-center items-center">
        <h1 className="text-2xl font-semibold mb-4">Countries List</h1>
        <Button onClick={handleLogout} className="ml-auto">
          Log out
        </Button>
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for a country..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); // Reset to first page on search
        }}
        className="w-full p-2 mb-4 border rounded-md"
      />

      <h2 className="my-2">Please select two countries to compare:</h2>

      {/* Countries Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Select</th>
              <th className="border p-2">Flag</th>
              <th className="border p-2">Name</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCountries.map((country: Country) => (
              <tr key={country.code} className="text-center hover:bg-gray-100">
                <td className="border p-2">
                  <input
                    type="checkbox"
                    checked={selectedCountries.includes(country.code)}
                    onChange={() => handleSelect(country.code)}
                    disabled={
                      selectedCountries.length >= 2 &&
                      !selectedCountries.includes(country.code)
                    }
                  />
                </td>
                <td className="border p-2">{country.emoji}</td>
                <td className="border p-2 font-semibold">{country.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <Button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span>
            Page {page} of {totalPages}
          </span>
          <Button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      {/* Country Comparison */}
      {selectedData.length === 2 && (
        <div className="mt-6 p-6 border rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Country Comparison</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-bold">{selectedData[0].name}</p>
              <p className="text-3xl">{selectedData[0].emoji}</p>
            </div>
            <div className="font-semibold text-gray-600">VS</div>
            <div>
              <p className="text-lg font-bold">{selectedData[1].name}</p>
              <p className="text-3xl">{selectedData[1].emoji}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

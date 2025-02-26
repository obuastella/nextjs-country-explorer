"use client";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const mockCountries = [
  {
    id: "1",
    name: "United States",
    flag: "https://flagcdn.com/w320/us.png",
    population: 331002651,
    area: 9833520,
    gdp: 21427700,
    region: "Americas",
  },
  {
    id: "2",
    name: "Canada",
    flag: "https://flagcdn.com/w320/ca.png",
    population: 37742154,
    area: 9984670,
    gdp: 1736426,
    region: "Americas",
  },
  {
    id: "3",
    name: "Germany",
    flag: "https://flagcdn.com/w320/de.png",
    population: 83783942,
    area: 357022,
    gdp: 3845630,
    region: "Europe",
  },
  {
    id: "4",
    name: "Japan",
    flag: "https://flagcdn.com/w320/jp.png",
    population: 126476461,
    area: 377975,
    gdp: 5081770,
    region: "Asia",
  },
];

export default function CountriesPage() {
  const [search, setSearch] = useState("");
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const router = useRouter();
  // Handle country selection
  const handleSelect = (id: string) => {
    setSelectedCountries((prev) => {
      if (prev.includes(id)) {
        return prev.filter((countryId) => countryId !== id); // Deselect if already selected
      }
      return prev.length < 2 ? [...prev, id] : prev; // Limit selection to 2 countries
    });
  };

  // Get selected country data
  const selectedData = mockCountries.filter((country) =>
    selectedCountries.includes(country.id)
  );

  // Filter countries based on search
  const filteredCountries = mockCountries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
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
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border rounded-md"
      />
      <h2 className="my-2">Please select two countries to compare:</h2>
      {/* Countries Table with Selection */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Select</th>
              <th className="border p-2">Flag</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Population</th>
              <th className="border p-2">Area (km²)</th>
              <th className="border p-2">Region</th>
            </tr>
          </thead>
          <tbody>
            {filteredCountries.map((country) => (
              <tr key={country.id} className="text-center hover:bg-gray-100">
                <td className="border p-2">
                  <input
                    type="checkbox"
                    checked={selectedCountries.includes(country.id)}
                    onChange={() => handleSelect(country.id)}
                    disabled={
                      selectedCountries.length >= 2 &&
                      !selectedCountries.includes(country.id)
                    }
                  />
                </td>
                <td className="border p-2">
                  <img
                    src={country.flag}
                    alt={country.name}
                    className="w-10 h-6"
                  />
                </td>
                <td className="border p-2 font-semibold">{country.name}</td>
                <td className="border p-2">
                  {country.population.toLocaleString()}
                </td>
                <td className="border p-2">{country.area.toLocaleString()}</td>
                <td className="border p-2">{country.region}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Comparison Section */}
      {selectedData.length === 2 && (
        <div className="mt-6 p-6 border rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Country Comparison</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-bold">{selectedData[0].name}</p>
              <img
                src={selectedData[0].flag}
                alt={selectedData[0].name}
                className="mx-auto w-16 h-10"
              />
            </div>
            <div className="font-semibold text-gray-600">VS</div>
            <div>
              <p className="text-lg font-bold">{selectedData[1].name}</p>
              <img
                src={selectedData[1].flag}
                alt={selectedData[1].name}
                className="mx-auto w-16 h-10"
              />
            </div>
          </div>

          <table className="w-full mt-4 border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Attribute</th>
                <th className="border p-2">{selectedData[0].name}</th>
                <th className="border p-2">{selectedData[1].name}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2 font-semibold">Population</td>
                <td className="border p-2">
                  {selectedData[0].population.toLocaleString()}
                </td>
                <td className="border p-2">
                  {selectedData[1].population.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="border p-2 font-semibold">Area (km²)</td>
                <td className="border p-2">
                  {selectedData[0].area.toLocaleString()}
                </td>
                <td className="border p-2">
                  {selectedData[1].area.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="border p-2 font-semibold">GDP (Billion $)</td>
                <td className="border p-2">
                  {selectedData[0].gdp.toLocaleString()}
                </td>
                <td className="border p-2">
                  {selectedData[1].gdp.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

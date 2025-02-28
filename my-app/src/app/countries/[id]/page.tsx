"use client";

import { useQuery, gql } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

const GET_COUNTRY_DETAILS = gql`
  query GetCountry($code: ID!) {
    country(code: $code) {
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

export default function CountryDetails() {
  const router = useRouter();
  const { id } = useParams(); // Get the country code from the URL

  // Fetch country details
  const { data, loading, error } = useQuery(GET_COUNTRY_DETAILS, {
    variables: { code: id },
  });

  if (loading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader className="animate-spin text-gray-500 w-12 h-12" />
      </div>
    );

  if (error)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="text-red-500 text-lg font-semibold">
          Error: {error.message}
        </p>
      </div>
    );

  const country = data?.country;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <Button
        onClick={() => router.back()}
        className="mb-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg"
      >
        ← Back
      </Button>

      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center border">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
          {country.emoji} {country.name}
        </h1>

        <div className="text-lg text-gray-700 space-y-3">
          <p>
            <span className="font-semibold text-gray-900">Capital:</span>{" "}
            {country.capital}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Currency:</span>{" "}
            {country.currency}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Languages:</span>{" "}
            {country.languages
              .map((lang: { name: string }) => lang.name)
              .join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}

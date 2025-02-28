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
        <Loader className="my-auto animate-spin mx-auto" />;
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  const country = data?.country;

  return (
    <div className="p-6">
      <Button onClick={() => router.back()} className="mb-4">
        Back
      </Button>

      <h1 className="text-3xl font-bold">
        {country.name} {country.emoji}
      </h1>
      <p className="text-xl mt-4">
        <strong>Capital:</strong> {country.capital}
      </p>
      <p className="text-xl">
        <strong>Currency:</strong> {country.currency}
      </p>
      <p className="text-xl">
        <strong>Languages:</strong>{" "}
        {country.languages
          .map((lang: { name: string }) => lang.name)
          .join(", ")}
      </p>
    </div>
  );
}

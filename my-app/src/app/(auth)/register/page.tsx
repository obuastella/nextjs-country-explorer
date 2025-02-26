"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Payload:", formData);
    toast.success("User registered successfully");
    // Redirect to login page after registration (Add real auth later)
    router.push("/");
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
            >
              {isLoading ? (
                <Loader className="animate-spin mx-auto" />
              ) : (
                "Register"
              )}
            </button>
          </form>
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

import React from "react";
import AuthForm from "../components/AuthForm";

export default function AuthPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-serif tracking-wide text-neutral-900 mb-2">
          Welcome to COLORED
        </h1>
        <p className="text-neutral-600 max-w-md mx-auto text-sm">
          Sign in or create an account to unlock your personalized palette and
          wardrobe.
        </p>
      </div>

      <AuthForm />

      <p className="text-xs text-neutral-500 mt-8">
        By continuing, you agree to our{" "}
        <a href="#" className="underline hover:text-neutral-800">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline hover:text-neutral-800">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}

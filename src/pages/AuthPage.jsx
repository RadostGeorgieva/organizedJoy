import React, { useState } from "react";
import AuthForm from "../components/AuthForm";

export default function AuthPage() {
  const [mode, setMode] = useState("login");

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 relative">
      <div className={`absolute inset-0 ${mode === "login" ? "bg-gradient-to-br from-neutral-100 to-neutral-200" : "bg-gradient-to-br from-amber-50 to-pink-100"} -z-10`} />

      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-serif tracking-wide text-neutral-900 mb-3">
          {mode === "login" ? "Welcome Back" : "Join COLORED"}
        </h1>
        <p className="text-neutral-600 max-w-md mx-auto text-sm md:text-base">
          {mode === "login"
            ? "Sign in to access your personal wardrobe and color palette."
            : "Create your free account and start building your curated wardrobe."}
        </p>
      </div>

      <AuthForm mode={mode} onModeChange={setMode} />
    </div>
  );
}

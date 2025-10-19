import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function signUp() {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) return alert(error.message);
    alert("Check your email to confirm (unless you disabled confirmations).");
  }

  async function signIn() {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <div className="w-full max-w-sm bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
      {user ? (
        <div className="flex flex-col items-center gap-3">
          <p className="text-neutral-700 text-sm">
            Logged in as <span className="font-semibold">{user.email}</span>
          </p>
          <button
            onClick={signOut}
            className="mt-2 px-4 py-2 rounded-lg bg-neutral-900 text-white text-sm hover:bg-neutral-800 transition"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-4"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-neutral-600"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-neutral-600"
          />
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button
              type="button"
              onClick={signIn}
              className="flex-1 bg-neutral-900 text-white py-2 rounded-md text-sm hover:bg-neutral-800 transition"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={signUp}
              className="flex-1 border border-neutral-900 text-neutral-900 py-2 rounded-md text-sm hover:bg-neutral-900 hover:text-white transition"
            >
              Sign Up
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AuthForm;

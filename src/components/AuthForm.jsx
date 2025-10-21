import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

 
  async function loadUsername(u) {
    const { data, error } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", u.id)
      .single();
    if (!error) setUsername(data?.username ?? "");
  }

  // ——— mount / auth state ———
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
        await loadUsername(data.user);
      }
    })();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_evt, session) => {
        const u = session?.user ?? null;
        setUser(u);
        if (u) await loadUsername(u);
        else setUsername("");
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  // ——— actions ———
  async function signUp() {
    const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: { username: username.trim() }
  }
});
if (error) return alert(error.message);

  }

  async function signIn() {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return alert(error.message);
    const u = data.user ?? data.session?.user ?? null;
    if (u) await loadUsername(u);
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
    setEmail(""); setPass(""); setUsername("");
  }

  return (
    <div className="w-full max-w-sm bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
      {!user ? (
        <form onSubmit={(e)=>e.preventDefault()} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username (for new accounts)"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-neutral-600"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-neutral-600"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPass(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-neutral-600"
          />
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button type="button" onClick={signIn}
              className="flex-1 bg-neutral-900 text-white py-2 rounded-md text-sm hover:bg-neutral-800 transition">
              Sign In
            </button>
            <button type="button" onClick={signUp}
              className="flex-1 border border-neutral-900 text-neutral-900 py-2 rounded-md text-sm hover:bg-neutral-900 hover:text-white transition">
              Sign Up
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="text-sm text-neutral-700">
            Logged in as <span className="font-semibold">{user.email}</span>
          </div>
          <label className="text-sm">
            Username (from profile)
            <input
              type="text"
              value={username}
              readOnly
              className="mt-1 w-full px-3 py-2 border border-neutral-300 rounded-md text-sm bg-neutral-50"
            />
          </label>
          <div className="flex gap-3">
            <button onClick={signOut}
              className="bg-neutral-900 text-white py-2 rounded-md text-sm px-4 hover:bg-neutral-800">
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthForm;

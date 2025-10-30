import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function AuthForm({ mode = "login", onModeChange, onAuthSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const isLogin = mode === "login";

  async function loadUsername(u) {
    const { data, error } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", u.id)
      .single();
    if (!error) setUsername(data?.username ?? "");
  }

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
  }, [onAuthSuccess]);

  function validate() {
    if (!email.trim()) return "Email is required.";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Enter a valid email.";
    if (!password) return "Password is required.";
    if (!isLogin && !username.trim()) return "Username is required for sign up.";
    if (!isLogin && password.length < 6) return "Password must be at least 6 characters.";
    if (!isLogin && !termsAccepted) return "You must accept the Terms and Privacy Policy.";
    return "";
  }

  async function signUp() {
    const v = validate();
    if (v) return setErr(v);
    setErr(""); setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username: username.trim() } }
      });
      if (error) throw error;
      const newUser = data.user ?? data.session?.user ?? null;
      if (newUser) onAuthSuccess?.(newUser);
    } catch (e) {
      setErr(e.message || "Sign up failed.");
    } finally {
      setLoading(false);
    }
  }

  async function signIn() {
    const v = validate();
    if (v) return setErr(v);
    setErr(""); setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      const u = data.user ?? data.session?.user ?? null;
      if (u) {
        await loadUsername(u);
        onAuthSuccess?.(u);
      }
    } catch (e) {
      setErr(e.message || "Sign in failed.");
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
    setEmail(""); setPass(""); setUsername(""); setTermsAccepted(false);
  }

  function canSendReset() {
    return /^\S+@\S+\.\S+$/.test(email);
  }

  // Stub for now; shows an inline message. Swap to resetPasswordReal later.
  async function resetPasswordStub() {
    setErr("Password reset isn’t configured yet.");
  }

  /* Real implementation (when ready):
  async function resetPasswordReal() {
    setErr(""); setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback`, // TODO: set your reset page
      });
      if (error) throw error;
      setErr("Check your email for a reset link.");
    } catch (e) {
      setErr(e.message || "Could not start password reset.");
    } finally {
      setLoading(false);
    }
  }
  */

  async function handleSubmit(e) {
    e.preventDefault();
    if (isLogin) await signIn();
    else await signUp();
  }

  return (
    <div className="w-full max-w-sm bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
      {!user ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-lg font-medium text-neutral-900">
              {isLogin ? "Log in" : "Create your account"}
            </h2>
            {onModeChange && (
              <button
                type="button"
                onClick={() => { setErr(""); setTermsAccepted(false); onModeChange(isLogin ? "signup" : "login"); }}
                className="text-xs underline text-neutral-600 hover:text-neutral-900"
              >
                {isLogin ? "Sign up" : "I have an account"}
              </button>
            )}
          </div>

          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-neutral-700"
              autoComplete="username"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-neutral-700"
            autoComplete="email"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPass(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-neutral-700"
            autoComplete={isLogin ? "current-password" : "new-password"}
          />

          {/* Terms & Privacy (signup only) */}
          {!isLogin && (
            <label className="flex items-start gap-2 text-xs text-neutral-600 select-none">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e)=>setTermsAccepted(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-black"
              />
              <span>
                I agree to the{" "}
                <a href="/terms" className="underline hover:text-neutral-900">Terms of Service</a>
                {" "}and{" "}
                <a href="/privacy" className="underline hover:text-neutral-900">Privacy Policy</a>.
              </span>
            </label>
          )}

          {err && (
            <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {err}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || (!isLogin && !termsAccepted)}
            className={`mt-1 py-2 rounded-md text-sm transition
              ${isLogin
                ? "bg-neutral-900 text-white hover:bg-neutral-800 disabled:bg-neutral-700"
                : "bg-black text-white hover:bg-neutral-800 disabled:bg-neutral-700"}`}
          >
            {loading ? (isLogin ? "Logging in…" : "Creating account…") : (isLogin ? "Log in" : "Create account")}
          </button>

          {/* Bottom row: clickable reset (login only) */}
          {isLogin && (
            <div className="flex items-center justify-end mt-2">
              <button
                type="button"
                onClick={resetPasswordStub /* switch to resetPasswordReal when ready */}
                disabled={!canSendReset() || loading}
                className="text-xs underline text-neutral-600 hover:text-neutral-900 disabled:text-neutral-400"
                title={!canSendReset() ? "Enter a valid email first" : "Send reset email"}
              >
                Forgot your password?
              </button>
            </div>
          )}
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
            <button
              onClick={signOut}
              className="bg-neutral-900 text-white py-2 rounded-md text-sm px-4 hover:bg-neutral-800"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

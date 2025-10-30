import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function AuthButton() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    navigate("/"); // redirect to home
  }

  if (user) {
    return (
      <div className="flex items-center gap-3 text-sm">
        <span className="text-neutral-600">Hi, {user.email}</span>
        <button
          onClick={signOut}
          className="text-neutral-900 hover:underline underline-offset-4"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => navigate("/auth")}
      className="text-neutral-900 hover:underline underline-offset-4 text-sm"
    >
      Sign In / Register
    </button>
  );
}

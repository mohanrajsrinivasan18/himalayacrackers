
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    await supabase.auth.signInWithPassword({ email, password });
    window.location.href = "/admin/dashboard";
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Login</h1>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}

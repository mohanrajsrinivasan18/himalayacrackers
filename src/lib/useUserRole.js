import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function useUserRole() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    async function loadRole() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

      setRole(data?.role);
    }

    loadRole();
  }, []);

  return role;
}

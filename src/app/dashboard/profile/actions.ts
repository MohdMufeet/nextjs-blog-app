"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const username = formData.get("username") as string;
  const full_name = formData.get("full_name") as string;
  const bio = formData.get("bio") as string;
  const avatar_url = formData.get("avatar_url") as string;

  const { error } = await supabase
    .from("profiles")
    .update({
      username,
      full_name,
      bio,
      avatar_url,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  redirect("/dashboard");
}
"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createPost(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;
  const category_id = formData.get("category_id") as string;

  // Check if slug already exists
  const { data: existingPost } = await supabase
    .from("posts")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (existingPost) {
    throw new Error("Slug already exists.");
  }

  const { error } = await supabase.from("posts").insert({
    title,
    slug,
    content,
    category_id,
    author_id: user.id,
    published: true,
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/dashboard");
}
"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { generateSlug } from "@/lib/slug";

export async function updatePost(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const slug = generateSlug(title);

  await supabase
    .from("posts")
    .update({
      title,
      slug,
      // content,
      published: true,
    })
    .eq("id", id)
    .eq("author_id", user.id);

  await supabase
    .from("posts")
    .update({
      title: formData.get("title"),
      content: formData.get("content"),
      published: formData.get("published") === "true",
    })
    .eq("id", id)
    .eq("author_id", user.id);

  revalidatePath("/dashboard");

  redirect("/dashboard");
}

"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updatePost(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const id = formData.get("id") as string;

  await supabase
    .from("posts")
    .update({
      title: formData.get("title"),
      content: formData.get("content"),
      status: formData.get("status"),
    })
    .eq("id", id)
    .eq("author_id", user.id);

  revalidatePath("/dashboard");

  redirect("/dashboard");
}
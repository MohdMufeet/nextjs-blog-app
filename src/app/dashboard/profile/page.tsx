import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateProfile } from "./actions";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Edit Profile
      </h1>

      <form action={updateProfile} className="space-y-4">
        <input
          name="username"
          defaultValue={profile?.username}
          placeholder="Username"
          className="w-full border rounded p-2"
        />

        <input
          name="full_name"
          defaultValue={profile?.full_name}
          placeholder="Full Name"
          className="w-full border rounded p-2"
        />

        <input
          name="avatar_url"
          defaultValue={profile?.avatar_url}
          placeholder="Avatar URL"
          className="w-full border rounded p-2"
        />

        <textarea
          name="bio"
          defaultValue={profile?.bio}
          placeholder="Bio"
          rows={5}
          className="w-full border rounded p-2"
        />

        <button
          className="bg-black text-white px-4 py-2 rounded"
        >
          Save Profile
        </button>
      </form>
    </main>
  );
}
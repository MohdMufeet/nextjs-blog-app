import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/auth/logout-button";

export default async function DashboardPage() {
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
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between bg-white rounded-xl shadow-md p-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              👋 Welcome
            </h1>
            <p className="text-gray-500 mt-1">
              Manage your profile and blog from here.
            </p>
          </div>

          <LogoutButton />
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-indigo-600 h-24"></div>

          <div className="px-8 pb-8 -mt-12">
            <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow flex items-center justify-center text-3xl font-bold text-indigo-600">
              {profile?.username?.charAt(0).toUpperCase() ??
                user.email?.charAt(0).toUpperCase()}
            </div>

            <div className="mt-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {profile?.full_name || "No Name"}
              </h2>

              <p className="text-gray-500">
                @{profile?.username || "username"}
              </p>

              <p className="mt-4 text-gray-700">
                {profile?.bio || "No bio added yet."}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="rounded-lg border p-5">
                <h3 className="text-sm text-gray-500">Email</h3>
                <p className="font-medium break-all">
                  {user.email}
                </p>
              </div>

              <div className="rounded-lg border p-5">
                <h3 className="text-sm text-gray-500">
                  Account Status
                </h3>
                <p className="font-semibold text-green-600">
                  Active ✅
                </p>
              </div>

              <div className="rounded-lg border p-5">
                <h3 className="text-sm text-gray-500">
                  User ID
                </h3>
                <p className="font-medium truncate">
                  {user.id}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Future Sections */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-bold text-lg">📝 My Posts</h3>
            <p className="text-gray-500 mt-2">
              Coming Soon...
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-bold text-lg">💬 Comments</h3>
            <p className="text-gray-500 mt-2">
              Coming Soon...
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-bold text-lg">📂 Categories</h3>
            <p className="text-gray-500 mt-2">
              Coming Soon...
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
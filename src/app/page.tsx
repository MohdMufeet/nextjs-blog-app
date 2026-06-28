import { supabase } from "@/lib/supabase";

export default async function HomePage() {
  const { data, error } = await supabase.auth.getSession();

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div>
        <h1 className="text-4xl font-bold">Blog App 🚀</h1>

        <p className="mt-4">
          {error ? "Connection Failed ❌" : "Supabase Connected ✅"}
        </p>
      </div>
    </main>
  );
}
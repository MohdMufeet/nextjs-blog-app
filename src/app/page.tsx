import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">
        Latest Posts
      </h1>

      {posts?.length === 0 ? (
        <p>No published posts yet.</p>
      ) : (
        <div className="grid gap-6">
          {posts?.map((post) => (
            <article
              key={post.id}
              className="border rounded-lg p-6"
            >
              <h2 className="text-2xl font-semibold">
                {post.title}
              </h2>

              <p className="text-gray-600 mt-3 line-clamp-3">
                {post.content}
              </p>

              <Link
                href={`/posts/${post.id}`}
                className="inline-block mt-5 text-blue-600 hover:underline"
              >
                Read More →
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
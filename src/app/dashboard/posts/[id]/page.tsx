import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PostPage({ params }: Props) {
  const { id: slug } = await params;

  const supabase = await createClient();

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold">
        {post.title}
      </h1>

      <p className="text-gray-500 mt-2">
        {new Date(post.created_at).toLocaleDateString()}
      </p>

      <article className="prose max-w-none mt-8">
        {post.content}
      </article>
    </main>
  );
}
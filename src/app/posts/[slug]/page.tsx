import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  const supabase = await createClient();

  const { data: post } = await supabase
    .from("posts")
    // .select("*")
    .select(`*,profiles (full_name),categories ( name)`)
    .eq("slug", slug)
    // .eq("status", true)
    .single();

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold">{post.title}</h1>

      <p className="text-gray-500 mt-2">
        {new Date(post.created_at).toLocaleDateString()}
      </p>
      <div className="flex gap-6 mt-4 text-gray-600">
        <p>Author: {post.profiles?.full_name}</p>

        <p>Category: {post.categories?.name}</p>
      </div>

      <article className="prose max-w-none mt-8">{post.content}</article>
    </main>
  );
}

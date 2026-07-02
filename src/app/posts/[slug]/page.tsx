import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const supabase = await createClient();

  const { data: post } = await supabase
    .from("posts")
    .select("title, content")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const description =
    post.content?.replace(/\n/g, " ").slice(0, 160) ?? "";

  return {
    title: `${post.title} | Mufeet Blog`,
    description,

    openGraph: {
      title: post.title,
      description,
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  const supabase = await createClient();

  const { data: post } = await supabase
    .from("posts")
    .select(`
      *,
      profiles(full_name),
      categories(name)
    `)
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold">{post.title}</h1>

      <p className="mt-2 text-gray-500">
        {new Date(post.created_at).toLocaleDateString()}
      </p>

      <div className="mt-4 flex gap-6 text-gray-600">
        <p>Author: {post.profiles?.full_name}</p>
        <p>Category: {post.categories?.name}</p>
      </div>

      <article className="prose max-w-none mt-8">
        {post.content}
      </article>
    </main>
  );
}
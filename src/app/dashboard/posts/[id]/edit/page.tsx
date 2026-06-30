import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updatePost } from "./actions";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .eq("author_id", user.id)
    .single();

  if (!post) {
    redirect("/dashboard");
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">
        Edit Post
      </h1>

      <form action={updatePost} className="space-y-6">

        <input
          type="hidden"
          name="id"
          value={post.id}
        />

        <div>
          <label className="block mb-2">
            Title
          </label>

          <input
            name="title"
            defaultValue={post.title}
            className="border w-full p-3 rounded"
          />
        </div>

        <div>
          <label className="block mb-2">
            Content
          </label>

          <textarea
            name="content"
            defaultValue={post.content}
            rows={10}
            className="border w-full p-3 rounded"
          />
        </div>

        <div>
          <label className="block mb-2">
            Status
          </label>

          <select
            name="status"
            defaultValue={post.status}
            className="border p-3 rounded w-full"
          >
            <option value="draft">
              Draft
            </option>

            <option value="published">
              Published
            </option>
          </select>
        </div>

        <button
          className="bg-black text-white px-6 py-3 rounded"
        >
          Save Changes
        </button>

      </form>
    </div>
  );
}
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createPost } from "./actions";

export default async function NewPostPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

console.log("Categories:", categories);
console.log("Error:", error);

  if (error) {
    throw new Error(error.message);
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Create Post
      </h1>

     <form action={createPost} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Post Title"
          className="w-full border rounded p-2"
        />

        <input
          type="text"
          name="slug"
          placeholder="post-slug"
          className="w-full border rounded p-2"
        />

        <select
          name="category_id"
          className="w-full border rounded p-2"
          defaultValue=""
        >
          <option value="" disabled>
            Select Category
          </option>

          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <textarea
          name="content"
          rows={10}
          placeholder="Write your article..."
          className="w-full border rounded p-2"
        />

        <button
          type="submit"
          className="bg-black text-white px-5 py-2 rounded"
        >
          Publish
        </button>
      </form>
    </main>
  );
}
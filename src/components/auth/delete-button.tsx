"use client";

type Props = {
  action: (formData: FormData) => void;
  id: string;
};

export default function DeleteButton({
  action,
  id,
}: Props) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        const ok = window.confirm(
          "Are you sure you want to delete this post?"
        );

        if (!ok) {
          e.preventDefault();
        }
      }}
    >
      <input
        type="hidden"
        name="id"
        value={id}
      />

      <button
        className="text-red-600 hover:underline"
      >
        Delete
      </button>
    </form>
  );
}
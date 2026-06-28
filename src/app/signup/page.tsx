import { signup } from "./actions";

export default function SignupPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center justify-center p-6">
      <form action={signup} className="w-full space-y-4 rounded-xl border p-6">
        <h1 className="text-3xl font-bold">Create Account</h1>

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full rounded border p-3"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          minLength={6}
          className="w-full rounded border p-3"
        />

        <button
          type="submit"
          className="w-full rounded bg-black p-3 text-white"
        >
          Sign Up
        </button>
      </form>
    </main>
  );
}
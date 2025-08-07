import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-6">
      <h1 className="mb-8 text-5xl font-extrabold text-blue-900 drop-shadow-md">
        Welcome to Typing Game
      </h1>
      <div className="flex gap-6">
        <LoginLink
          postLoginRedirectURL="/game"
          className="rounded bg-blue-700 px-6 py-3 text-white shadow-lg transition hover:bg-blue-800"
        >
          Login
        </LoginLink>
        <RegisterLink
          postLoginRedirectURL="/game"
          className="rounded border-2 border-blue-700 px-6 py-3 text-blue-700 shadow-lg transition hover:bg-blue-100"
        >
          Register
        </RegisterLink>
      </div>
    </main>
  );
}

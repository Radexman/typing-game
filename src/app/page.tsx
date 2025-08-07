import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <main className="justify-cente flex min-h-screen flex-col items-center">
      <h1 className="text-4xl font-bold">Welcome to Typing Game</h1>
      <div className="mt-4 flex gap-4">
        <LoginLink postLoginRedirectURL="/game">Login</LoginLink>
        <RegisterLink postLoginRedirectURL="/game">Register</RegisterLink>
      </div>
    </main>
  );
}

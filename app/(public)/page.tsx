import SignIn from "@/components/sign-in";

export default function HomePage() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to Our App</h1>
      <p className="text-lg">This is the public home page.</p>
      <SignIn />
    </main>
  );
}

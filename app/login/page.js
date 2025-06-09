"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';

const LoginPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const sendSessionToServer = async () => {
        try {
          await axios.post('/api/userss', {
      name: session.user.name,
      email: session.user.email,
      profilePhoto: session.user.image,
    });
        router.push("/dashboard");
        } catch (err) {
          console.error("Error sending session to backend:", err);
        }
      };
      sendSessionToServer();
      
    }
  }, [status, session, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-6 text-purple-400">
          Login / Register
        </h2>

        {status === "loading" && (
          <p className="text-gray-300">Checking session...</p>
        )}

        {status === "unauthenticated" && (
          <>
            <button
              onClick={() => signIn("google")}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded mb-4 transition"
            >
              Sign in with Google
            </button>

            <button
              onClick={() => signIn("github")}
              className="w-full bg-gray-800 hover:bg-black text-white py-2 px-4 rounded transition"
            >
              Sign in with GitHub
            </button>
          </>
        )}

        {status === "authenticated" && (
          <>
            <p className="mb-4 text-green-400">
              You are logged in as {session?.user?.name}
            </p>
            <button
              onClick={() => signOut()}
              className="w-full bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded transition"
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;

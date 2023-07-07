import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Disconnected() {
  const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
      const redirectTimeout = setTimeout(() => {
        if (!session) {
          window.location.replace("/");
        }
      }, 700000);
    
      return () => {
        clearTimeout(redirectTimeout);
      };
    }, [session]);

    function login() {
        router.push(signIn("google"));
      }

    return ( 
        <div className="flex flex-col justify-center items-center h-screen ">
        <div className="text-red-600 font-bold border rounded-full bg-gray-50 p-2">
        Your account is disconnected. Please log in to start posting! You will be redirected to the homepage in a few seconds.
        </div>
        <button
          className="mt-4 text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-2xl px-5 py-2.5"
          onClick={login}
        >
          Login
        </button>
      </div>
    )
    
};

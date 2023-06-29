import { useSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Login({ children }) {
  const { data: session } = useSession();

  const [boardVisible, setBoardVisible] = useState(true);

  const toggleBoardVisibility = () => {
    setBoardVisible(!boardVisible);
  };

  useEffect(() => {
    return () => {
      clearTimeout();
    };
  }, []);

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="relative">
          <img
            onMouseEnter={toggleBoardVisibility}
            
            src="/images/codeleap.png"
            className={`transition-opacity duration-1000 scale-50 ${
              boardVisible ? "opacity-100" : "opacity-0"
            }`}
            alt="Logo"
          />

          {!boardVisible && (
            <button
    
              
              onClick={() => signIn("google")}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-2xl px-5 py-2.5 text-center"
            >
              Google Account
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen">
  {children}
</div>

  );
}

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
      <div className="flex flex-col items-center justify-center h-screen bg-white">
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
              className="bg-[#050708] awesomebutton top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute px-5 py-2.5"
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

import { useSession, signOut } from "next-auth/react";


export default function Profile(props) {
  const { user } = props;
  const { data: session } = useSession();

  return (
    <div className="w-full flex items-center ">
      <div className="w-full max-w-md">
        <div className="w-[1100px] min-[500px]:w-screen items-center flex flex-col bg-gradient-to-r from-gray-400 to-gray-50 shadow-2xl">
          <div className="mt-5 font-extrabold text-gray-800 text-center ">
            Welcome to CodeLeap Network {session?.user?.name}.
          </div>
          <img
            src={session?.user?.image}
            alt=""
            className="w-24 h-24 rounded-full mt-5 mx-auto"
          />
          <div className="mt-5 text-center">
            You're connected as <span className="font-bold">{user}</span>
          </div>
          <button
            className="border border-gray-300 font-bold text-white rounded-2xl shadow-2xl px-2 py-1 bg-gray-800 mt-5 mb-5 hover:bg-red-500 hover:text-black"
            onClick={() => signOut("google")}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
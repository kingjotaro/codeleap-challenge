import { useSession, signOut } from "next-auth/react";

export default function Profile(props) {
  const { user } = props;
  const { data: session } = useSession();

  return (
    <div className="w-full max-w-[1100px] mx-auto">
      <div className="flex flex-col items-center bg-black rounded-t-full">
        <div className="mt-10 font-extrabold text-white min-[10px]:text-xs md:text-sm lg:text-base xl:text-lg text-center sm:text-left">
          Welcome to CodeLeap
          <br className="sm:hidden" /> Network {session?.user?.name}.
        </div>

        <img
          src={session?.user?.image}
          alt=""
          className="w-24 h-24 rounded-full mt-5 mx-auto"
        />

        <div className="mt-5 text-center text-white">
          You're connected as <span className="font-bold">{user}</span>
        </div>

        <button
          className="border border-gray-300 font-bold text-white rounded-2xl px-2 py-1 bg-gray-800 mt-5 mb-5 hover:bg-red-500 hover:text-black"
          onClick={() => signOut("google")}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

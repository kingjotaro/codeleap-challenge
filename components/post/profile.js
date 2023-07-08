import { useSession, signOut } from "next-auth/react";


export default function Profile(props) {
  const { user } = props;
  const { data: session } = useSession();

  return (
    <div className="w-[100%] max-w-[1100px] ">
        <div className="items-center flex flex-col bg-black rounded-t-full ">
        <div className="mt-10 font-extrabold text-white text-center sm:text-left md:text-center text-sm md:text-lg lg:text-xl xl:text-2xl">
    Welcome to CodeLeap Network {session?.user?.name}.
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
            className="border border-gray-300 font-bold text-white rounded-2xl  px-2 py-1 bg-gray-800 mt-5 mb-5 hover:bg-red-500 hover:text-black"
            onClick={() => signOut("google")}
          >
            Sign out
          </button>
        </div>
      
    </div>
  );
}
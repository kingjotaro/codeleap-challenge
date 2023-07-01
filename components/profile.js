import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";


export default function Profile(props) {

    const router = useRouter();
    const {user} = props;
    const { data: session } = useSession();
    

    
   
    return ( 
        <div className="w-[400px] h-[370px] border border-black rounded-l-2xl items-center flex flex-col bg-gradient-to-r from-gray-400 to-gray-50 shadow-2xl">
            <div className="mt-5  font-extrabold text-gray-800">Wellcome to CodeLeap Network {session?.user?.name}.</div>
            
            <img src={session?.user?.image} alt="" className="w-40 h-40 rounded-full mt-5" />
            <div className="mt-5 " >You're connected as <span className="font-bold ">{user}</span>  </div>
           
        <button className='awesomebutton px-2 py-1 bg-gray-400 mt-5' onClick={() => signOut("google")}>Sign out</button>
        </div>
    )

   
    
};

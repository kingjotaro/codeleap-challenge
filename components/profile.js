import { useSession } from "next-auth/react";
import {signOut } from "next-auth/react"
import { useRouter } from "next/router";

export default function Profile() {
    const router = useRouter();

    function logout() {
        signOut();
        router.push()
    }

    const { data: session } = useSession();
    return ( 
        <div className="w-[400px] h-[370px] border border-black rounded-2xl">
            <img src={session?.user?.image} alt="" className="w-50 h-50 rounded-full" />
            <div>Wellcome to CodeLeap Network {session?.user?.name}.</div>
            <div>You're connected as  </div>
        <button onClick={logout}>Sign out</button>
        </div>
    )
    
};

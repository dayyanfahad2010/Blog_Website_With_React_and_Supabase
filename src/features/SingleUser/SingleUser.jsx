import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Layout/Header/header";
import { supabase } from "../../App";
import ProfileCart from "../profilecart/ProfileCart";
import UserPosts from "../posts/UserPosts/UserPosts";

export default function SingleUser() {
    const { id } = useParams();
    const [user,setUser]=useState("")
    useEffect(()=>{
        const ShowPostOnUrl= async()=>{
            const { data } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", id)
            .single();
            
            setUser(data)
        }
        ShowPostOnUrl()
    },[])
    
    return(
        <>
        <Header/>
        {user !==""? <>
                <ProfileCart  profile={user}/>
                <UserPosts/>
                </>
        : <>Loading ...</>
        }
        </>
    )                     
}

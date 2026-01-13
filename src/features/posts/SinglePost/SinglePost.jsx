import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserAuth } from "../../auth/AuthContext";
import PostCart from "../PostCart/index";
import Header from "../../../components/Layout/Header/header";

export default function SinglePost() {
    const { id } = useParams();
    const {PostsData}=UserAuth()
    const [post,setPost]=useState("")
    useEffect(()=>{
        const ShowPostOnUrl= async()=>{
            const result=await PostsData()
            if(result.success){
                console.log(result.data);
                
                const FindPost =result.data.filter(post => post.id ===id)
                console.log(FindPost);
                setPost(FindPost)
                
            }
        }
        ShowPostOnUrl()
    },[])
    
    return(
        <>
        <Header/>
        {post !==""? post.map((c)=>{
            return(   
                <PostCart key={c.id} postData={c}/>
            )
        }): <>Loading ...</>
        }
        </>
    )                     
}

import { useParams } from "react-router-dom";
import { UserAuth } from "../auth/Context";
import { useEffect } from "react";
import PostCart from "../Post/PostCart";

const ShowPostOnUrl= async()=>{
    const {PostsData}=UserAuth()
    const { id } = useParams();
    const result=await PostsData()
    if(result.success){
        console.log(result.data);
        
        const FindPost =result.data.filter(post => post.id ===id)
        console.log(FindPost);
        FindPost.map((c)=>{
            return(

                <PostCart key={c.id} postData={c}/>
            )
        })
        
    }
}
export default function SinglePost() {
    const { id } = useParams();
    // useEffect(()=>{
    //     ShowPostOnUrl()
    // },[])

  // fetch post by id from Supabase here
  return(
      <div>
        Post ID: {id}
     <ShowPostOnUrl/>
      </div>

  ) 
  
}

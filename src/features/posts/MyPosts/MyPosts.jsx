import React, { useEffect, useState } from 'react'
import { UserAuth } from '../../auth/AuthContext';
import PostCart from '../PostCart/index';

const MyPosts = () => {
    const [myPosts,setPosts]=useState([])
    const [Loading,setLoading]=useState("")
    const {session,PostsData}=UserAuth()
    useEffect(()=>{
        const fetchPosts = async () => {
            try{
                const getAllPosts=await PostsData()
        
                const FilterPostsForLoggedUser = getAllPosts.data.filter(post => {
                    return post.user_id === session.user.id;
                });
                setPosts(FilterPostsForLoggedUser) 
        }catch (err) {
           console.log(err);
        } finally {
           setLoading(false)
        }
       };
       if(session){
         fetchPosts();
       }
       
      }, [session])


  return (
    <div>
        {
            myPosts.map((element,index)=>{
                return <PostCart 
                        key={index} 
                        postData={element}
                        post_image={element.post_url} 
                    />
            })
        }
    </div>
  )
}

export default MyPosts
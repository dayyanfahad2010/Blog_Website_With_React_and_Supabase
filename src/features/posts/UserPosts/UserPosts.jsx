import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserAuth } from '../../auth/AuthContext'
import PostCart from '../PostCart'

const UserPosts = () => {
  const {id}=useParams()
  const {PostsData}=UserAuth()
  const [userPost,setUserPost]=useState([])
  useEffect(()=>{
   const fetchPosts=async ()=>{
    const result =await PostsData()
    const filterPostsForUser=result.data.filter(post=>{return post.user_id===id})
    setUserPost(filterPostsForUser)
    console.log(filterPostsForUser);
    
    }
    fetchPosts() 
  },[])
    return (
     <div>
     {
         userPost.map((c)=>{
             return <PostCart key={c.id} postData={c} post_image={c.post_url}/>
         })
    }
     </div>
  )
}

export default UserPosts
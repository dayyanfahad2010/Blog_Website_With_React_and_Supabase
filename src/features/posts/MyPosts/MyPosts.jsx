import React, { useEffect, useState } from 'react'
import { supabase } from '../../../App';
import { UserAuth } from '../../auth/AuthContext';
import PostCart from '../PostCart/index';

const MyPosts = () => {
    const [myPosts,setPosts]=useState([])
    const [Loading,setLoading]=useState("")
    const {session}=UserAuth()
    useEffect(()=>{
        const fetchPosts = async () => {
            try {
                async function getAllPosts() {
                const { data, error } = await supabase
                .from('Posts')
                .select('*');
        
                if (error) {
                    console.error('Error fetching posts:', error.message);
                    return null;
                }
            
                console.log('All posts:', data);
                return data;
            }
            const AllPosts = await getAllPosts();
    
            const FilterPostsForLoggedUser = AllPosts.filter(post => {
                return post.user_id === session.user.id;
            });
            const postsWithUrlsForLoggedUser = await Promise.all(
            FilterPostsForLoggedUser.map(async (post) => {
                const { data } = supabase.storage
                    .from('post_image')
                    .getPublicUrl(post.post_url); 
                return {
                    ...post,
                    publicUrl: data.publicUrl, 
                };
                })
            );    
            setPosts(postsWithUrlsForLoggedUser) 
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
                        post_image={element.publicUrl} 
                    />
            })
        }
    </div>
  )
}

export default MyPosts
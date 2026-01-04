import React, { useEffect, useState } from 'react'
import { UserAuth } from '../auth/AuthContext';
import { supabase } from '../../App';
import PostCart from '../Post/PostCart';
import { Navigate, useNavigate } from 'react-router-dom';
import Header from '../layout/header/header';

const Home = () => {
  const [file,setFile]=useState(null)
  const [title,setTitle]=useState("")
  const [des,setDes]=useState("")
  const [loggedUserPosts,setPosts]=useState([])
  const [allPosts,setAllPosts]=useState([])
  const [loading, setLoading] = useState(true);
  const [err, setError] = useState(null);
  const {session,error,uploadFile,SaveToDB,signOut}=UserAuth();
     const navigate =useNavigate();
  
    
    const handleFileUpload =async(e)=>{
      e.preventDefault();
       const Filepath =`avatars/${file.name}`
       console.log(Filepath);
       
       const result = await uploadFile(Filepath,file)
       if(result.success){
         await SaveToDB(Filepath,des,title)    
         console.log(result);
        }
       else{
         console.log(result.error);
        }
     }
     
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
      
      useEffect(() => {
       const fetchPosts = async () => {
         try {
           const AllPosts = await getAllPosts();
    
           const FilterPostsForLoggedUser = AllPosts.filter(post => {
             return post.user_id === session.user.identities[0].identity_data.display_name;
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
           const postsWithUrls = await Promise.all(
               AllPosts.map(async (post) => {
                   const { data } = supabase.storage
                       .from('post_image')
                       .getPublicUrl(post.post_url); 
                   return {
                       ...post,
                       publicUrl: data.publicUrl, 
                   };
               })
           );        
           setAllPosts(postsWithUrls);
         } catch (err) {
           console.log(err);
           setError(err)
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
      <Header/>
    <div className='postAddingDiv'>
      <input type="text" placeholder='Post Title' value={title} onChange={(e)=>setTitle(e.target.value)} />
      <input type="text" placeholder='Write Something'value={des} onChange={(e)=>setDes(e.target.value)} />
      <input type="file"  onChange={(e)=>setFile(e.target.files[0])}/>
      <button onClick={handleFileUpload}>Post</button>
    </div>
    <div className='PostDiv'> 
        {allPosts.map((element, index) => (
          <PostCart 
            key={index} 
            postData={element}
            post_image={element.publicUrl} 
        />
      ))}
    </div>
    </div>
  )

} 
     
    
export default Home
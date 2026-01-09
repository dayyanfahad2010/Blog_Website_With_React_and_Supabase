import React, { useEffect, useState } from 'react'
import { UserAuth } from '../auth/Context';
import { supabase } from '../../App';
import PostCart from '../Post/PostCart';
import Header from '../layout/header/header';
import './home.css'

const Home = () => {
  const [file,setFile]=useState(null)
  const [title,setTitle]=useState("")
  const [des,setDes]=useState("")
  const [allPosts,setAllPosts]=useState([])
  const [loading, setLoading] = useState(true);
  const [err, setError] = useState(null);
  const {session,error,uploadFile,SaveToDB}=UserAuth();
  
    
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
    <>
    
      <Header/>
    <div className='app-wrapper'>
    <div className='postAddingDiv'>
      <div className="card-small">
        <div className="share-box-inner">
          <div className="profile-thumb">
            <img src="../assets/contact.png" alt="" />
          </div>
          <input type="text" className='share-text-box' placeholder='Write Something'value={des} onChange={(e)=>setDes(e.target.value)} />
          <input type="file" className='file' onChange={(e)=>setFile(e.target.files[0])}/>
          <button onClick={handleFileUpload} className='btn-share'>Post</button>
        </div>
      </div>
    </div>
    <div className='PostDiv'> 
        {allPosts.map((element, index) => (
          <PostCart 
            key={element.id} 
            postData={element}
            post_image={element.publicUrl} 
        />
      ))}
    </div>
    </div>
    </>
  )

} 
    
export default Home
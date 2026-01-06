import React, { createContext, useContext, useEffect, useState } from 'react'
import {supabase} from '../../App.js'

const AuthContext =createContext()
export const AuthContextProvider = ({children}) => {
    const [session,setSession] =useState(null)
    const [error,setError] =useState("")

    const signUpAUser =async (email,password,displayName)=>{
        const {data,error}=await supabase.auth.signUp({
            email:email,
            password:password,
            options: {
                data: {
                    display_name: displayName,
                }
            }
        })
        if(error){
            console.log("an error occurred",error)
            setError(error.message)
            return {success:false ,error}
        }
        return {success:true,data}
    }

    useEffect(()=>{
        supabase.auth.getSession().then(({data:{session}})=>{
            setSession(session)
        })
        const {data}=supabase.auth.onAuthStateChange((event,session)=>{
            setSession(session)
        })
    },[])

    const signIn =async (email,password)=>{
        const {data,error}=await supabase.auth.signInWithPassword({
            email:email,
            password:password
        })
        if(error){
            console.log("SignIn error",error)
            setError(error.message)
            return {success:false,error}
        }
        return {success:true,data}
    }
    const uploadFile=async (file_path,file,postTitle,postDes) =>{
        const { data, error } = await supabase.storage.from('post_image').upload(file_path, file)
        if (error) {
            return {success:false,error}
        } else {
            
            return {success:true,data}
        }
    }
    const SaveToDB = async (filePath,postDes,postTitle) => {
        let Like=0
        
        const { data } = supabase.storage
        .from('post_image')
        .getPublicUrl(filePath);
        
        const publicUrl = data.publicUrl;
        
        const { error: dbError } = await supabase
        .from('Posts')
        .insert([{
            user_id:session.user.id,
            user_name: session.user.identities[0].identity_data.display_name,
            post_url: publicUrl,
            post_title:postTitle,
            post_description:postDes,
            Likes:Like ,
            created_at: new Date().toISOString()
        }]);
        
        if (dbError) {
            console.error('Error saving URL to DB:', dbError.message);
        } else {
            console.log('Public URL saved to database:', publicUrl);
        }
    };
    async function signOut() {
        const { error } = await supabase.auth.signOut()
        if(error){
            setError(error)
            return {success:false,error}
            
        }
        return{success:true}
    }
    async function PostsData(){
         const { data, error } = await supabase
        .from('Posts')
        .select()
        if(error){
            return{success:false,error,message:'posts'}
        }
        return {success:true,data,message:"Posts"}
    }
    async function UpdatePostLikes(post_id,likes){
        const { error } = await supabase
        .from('Posts')
        .update({ Likes: likes })
        .eq('id', post_id)
        if(error){
            return{success:false,error}
        }
    }
    async function LikesData() {
        const { data, error } = await supabase
        .from('likes')
        .select()
        if(error){
            return{success:false,error}
        }
        return {success:true,data}
    }
    async function addLikes(post_id,user_id) {
        const resultOfAllData = await LikesData()
        const PostForLike =await PostsData()
        if(resultOfAllData.success){
            const loop=resultOfAllData.data.find(postAndUserWasFound => postAndUserWasFound.post_id===post_id && postAndUserWasFound.user_id===user_id)
            const FindPost =PostForLike.data.find(findpost=>findpost.id===post_id)
            
            console.log(FindPost);
            if(loop){
                const { data, error } = await supabase
                .from('likes')
                .delete()
                .eq('id', loop.id)
                .select()
                
                if(error){
                    console.log(error);
                    setError(error)
                    return {success:false,error,message:"delete"}
                }
                const LikesForThatPost=resultOfAllData.data.filter(likes=>likes.post_id===post_id)
                if(LikesForThatPost){
                    const UpdateLikes =await UpdatePostLikes(post_id,LikesForThatPost.length) 
                    console.log(UpdateLikes);
                }
         
                
                return{success:true,data ,message:"successful Delete"}
            }
            
            const { data, error } = await supabase
            .from('likes')
            .insert({  user_id: user_id,post_id:post_id })
            .select()
            
            if(error){
                console.log(error);
                setError(error)
                return {success:false,error}
            }
            const LikesForThatPost=resultOfAllData.data.filter(likes=>likes.post_id===post_id)
            if(LikesForThatPost){
                const UpdateLikes =await UpdatePostLikes(post_id,LikesForThatPost.length) 
                console.log(UpdateLikes);
            }

            
            return {success:true,data,message:"successful Insert"}
        }
    }
  return (
    <AuthContext.Provider value={{session,error,signOut ,signUpAUser ,signIn,uploadFile,SaveToDB,addLikes}}>
        {children}
    </AuthContext.Provider>
  )
}

export const UserAuth =()=>{ return useContext(AuthContext)}
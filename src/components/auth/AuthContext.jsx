import React, { createContext, useContext, useEffect, useState } from 'react'
import {supabase} from '../../App.js'

const AuthContext =createContext()
export const AuthContextProvider = ({children}) => {
    const [session,setSession] =useState(null)

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
        let Likes=0
        const { data } = supabase.storage
        .from('post_image')
        .getPublicUrl(filePath);

        const publicUrl = data.publicUrl;

        const { error: dbError } = await supabase
            .from('Posts')
            .insert([{
                user_id: session.user.identities[0].identity_data.display_name,
                post_url: publicUrl,
                post_title:postTitle,
                post_description:postDes,
                Likes:Likes 
            }]);

        if (dbError) {
            console.error('Error saving URL to DB:', dbError.message);
        } else {
            console.log('Public URL saved to database:', publicUrl);
        }
    };
  return (
    <AuthContext.Provider value={{session ,signUpAUser ,signIn,uploadFile,SaveToDB}}>
        {children}
    </AuthContext.Provider>
  )
}

export const UserAuth =()=>{ return useContext(AuthContext)}
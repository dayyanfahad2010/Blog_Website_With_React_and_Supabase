import React, { useState } from 'react'
import './postCart.css'
import { UserAuth } from '../../auth/AuthContext';
import contact from '../../../assets/contact.png'
import CommentSection from '../../comments/index';
const PostCart = (props) => {
    const [liked,setLiked]=useState(false)
    const [likesCount,setLikesCount]=useState(props.postData.Likes)
    const {addLikes,session}=UserAuth()
    const AddLikes =async ()=>{
      const result=await addLikes(props.postData.id,session.user.id)
      console.log(result);
      if(result.message==="successful Delete"){
        setLikesCount(likesCount-1) 
        setLiked(false)
      }
      else{
        setLikesCount(likesCount+1) 
        setLiked(true)
      }
    }
     const handleShare = async () => {
      const url = `${window.location.origin}/post/${props.postData.id}`;

        if (navigator.share) {
          await navigator.share({ title: "Post", url });
        } else {
          await navigator.clipboard.writeText(url);
          alert("Link copied");
        }
    };


  return (
      <div className="post">
        <div className="post-header">
          <div className="user">
            <img
              src={contact}
              alt="user"
            />
            <div>
              <h4>{props.postData.user_name}</h4>
              <span>20 min ago</span>
            </div>
          </div>
          <span className="menu">☰</span>
        </div>

        <p className="post-text">
          {props.postData.post_description}
        </p>

        <img
          className="post-image"
          src={props.postData.post_url}
          alt="post"
        />

        <div className="post-footer">
          <div className="likes">
            ❤️ <span>{likesCount} people like this</span>
          </div>

          <div className="stats">
            <span>💬 {props.postData.comment}</span>
            <span>🔁 07</span>
          </div>
        </div>

        <div className="post-actions">
          <button
            className={liked ? "active" : ""}
            onClick={AddLikes}
          >
            ❤️ Like
          </button>
          <button>💬 Comment</button>
          <button onClick={handleShare}>↗ Share</button>
        </div>
        <div>
          <CommentSection props={props}/>
        </div>
      </div>
    
   

  )
}

export default PostCart
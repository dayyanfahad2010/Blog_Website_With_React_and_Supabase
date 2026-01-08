import React, { useState } from 'react'
import './postCart.css'
import { UserAuth } from '../auth/Context';
import contact from '../assets/contact.png'
const PostCart = (props) => {
    const [liked,setLiked]=useState(false)
    const {addLikes,session}=UserAuth()
    console.log(props) ;
    console.log(session);
    const AddLikes =async ()=>{

        const result=await addLikes(props.postData.id,session.user.id)
        console.log(result);
         setLiked(!liked)
        window.location.reload()    
    }

  return (
   <div className="post">
      {/* Header */}
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

      {/* Content */}
      <p className="post-text">
        {props.postData.post_description}
      </p>

      <img
        className="post-image"
        src={props.postData.post_url}
        alt="post"
      />

      {/* Footer */}
      <div className="post-footer">
        <div className="likes">
          ❤️ <span>{props.postData.Likes} people like this</span>
        </div>

        <div className="stats">
          <span>💬 41</span>
          <span>🔁 07</span>
        </div>
      </div>

      {/* Actions */}
      <div className="post-actions">
        <button
          className={liked ? "active" : ""}
          onClick={AddLikes}
        >
          ❤️ Like
        </button>
        <button>💬 Comment</button>
        <button>↗ Share</button>
      </div>
    </div>

  )
}

export default PostCart
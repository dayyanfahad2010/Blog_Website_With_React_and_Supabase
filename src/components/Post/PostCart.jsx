import React from 'react'
import './postCart.css'
import { UserAuth } from '../auth/Context';

const PostCart = (props) => {
    const {addLikes,session}=UserAuth()
    console.log(props) ;
    console.log(session);
    const AddLikes =async ()=>{

        const result=await addLikes(props.postData.id,session.user.id)
        console.log(result);
         
        window.location.reload()    
    }

  return (
    <div className="post-card">
        <div className="post-header">
            <div>
                <h3 className="username">{props.postData.user_name}</h3>
                <span className="time">2 hours</span>
            </div>
        </div>

        <div className="post-content">
            <h4>{props.postData.post_title}</h4>
            <p>
                {props.postData.post_description}
            </p>
            <img
            src={props.postData.post_url}
            alt=""
            className="avatar"
            />
        </div>

        <div className="post-actions">
            <button className='LikesBtn' onClick={AddLikes}>👍Like</button> <p className='LikesPara'>{props.postData.Likes}</p>
            <button>💬 Comment</button>
            <button>↗ Share</button>
        </div>
    </div>

  )
}

export default PostCart
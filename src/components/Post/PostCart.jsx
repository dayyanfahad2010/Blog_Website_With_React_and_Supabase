import React from 'react'
import './postCart.css'
import { supabase } from '../../App';

const PostCart = (props) => {
    console.log(props) ;
    const AddLike = async () => {
        try {
            // 1️⃣ Get current likes
            const currentLikes = props.postData.Likes 
            
            // 2️⃣ Update likes in DB
            const { error } = await supabase
            .from('Posts')
            .update({ Likes: currentLikes + 1 })
            .eq('id', props.postData.id)
            // console.log();

        if (error) {
        console.error('Like failed:', error.message)
        return
        }

        // 3️⃣ Optimistic UI update (important)
        props.postData.Likes = currentLikes + 1
        
    } catch (err) {
        console.error('Unexpected error:', err)
    }
    }

  return (
    <div className="post-card">
        <div className="post-header">
            <div>
                <h3 className="username">{props.postData.user_id}</h3>
                <span className="time">2 hours ago</span>
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
            <button onClick={AddLike}>👍Like</button> <span>{props.postData.Likes}</span>
            <button>💬 Comment</button>
            <button>↗ Share</button>
        </div>
    </div>

  )
}

export default PostCart
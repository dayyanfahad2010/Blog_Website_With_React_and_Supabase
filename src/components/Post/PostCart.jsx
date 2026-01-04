import React from 'react'
import './postCart.css'
import { supabase } from '../../App';

const PostCart = (props) => {
    console.log(props) ;
    const AddLike = async () => {
    try {
        const { error } = await supabase
        .from('Posts')
        .update({
            Likes: (props.postData.Likes || 0) + 1
        })
        .eq('id', props.postData.id)
        console.log(props.postData.id);
        

        if (error) {
            console.error('Like error:', error.message)
            return
        }

        // FORCE refresh (because your state is not wired correctly)
        window.location.reload()

        }
        catch (err) {
            console.error(err)
        }
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
            <button className='LikesBtn' onClick={AddLike}>👍Like</button> <p className='LikesPara'>{props.postData.Likes}</p>
            <button>💬 Comment</button>
            <button>↗ Share</button>
        </div>
    </div>

  )
}

export default PostCart
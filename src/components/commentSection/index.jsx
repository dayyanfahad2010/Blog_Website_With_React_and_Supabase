import React, { useEffect, useState } from 'react'
import { UserAuth } from '../auth/Context'

const CommentSection = (props) => {
    const [comment,setComment]=useState("")
    const [Allcomments,setAllComments]=useState([])
    const {addComments,CommentsData,session}=UserAuth()
    const AddComments=async()=>{
      console.log(props,session);
      const user_name=session.user.identities[0].identity_data.display_name
        
      const result =await addComments(props.props.postData.id,session.user.id,user_name,comment)
      console.log(result);  
      if(result.success){
        setAllComments(result.CommentsForThatPost)
      }
    }
    useEffect( ()=>{
      async function ShowComments(){
        const resultOfAllData = await CommentsData()
        const CommentsForThatPost=resultOfAllData.data.filter(comments=>comments.post_id===props.props.postData.id)
        setAllComments(CommentsForThatPost)
      }
      ShowComments()
    },[])
    return (
    <div className="comments">
      {/* Input */}
      <div className="comment-input">
        <input type="text" placeholder='comment' value={comment} onChange={(e)=>setComment(e.target.value)}/>
        <button onClick={AddComments}>comment</button>
      </div>

      {/* List */}
      <div className="comment-list">
        {Allcomments.map((c) => (
          <div className="comment" key={c.id}>
            <strong>{c.user_name}</strong>
            <span className="time">2 hours</span>
            <p>{c.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection
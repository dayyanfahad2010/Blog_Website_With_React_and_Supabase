import React from "react";
import contact from '../../assets/contact.png'
import "./CommentCart.css";

export default function CommentCard({ user, text }) {
  console.log(user);
  
    return (
    <div className="comment-card">
      <div className="avatars"><img src={contact} alt="" /></div>

      <div className="comment-content">
        <div className="comment-bubble">
          <strong>{user}</strong>
          <p>{text}</p>
        </div>

        <div className="comment-actions">
          <span>👍 34</span>
          <span>Reply</span>
          <span>2 hours</span>
        </div>
      </div>
    </div>
  );
}

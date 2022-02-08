import React, { useState } from 'react';
import './App.css';
import NewComment from './components/newComment';
import JSONdata from './data';

// Import Comment, NewComment, DeleteModal


let currentId = 5;

const App = () => {
  const [data, setData] = useState(JSONdata);
  const [deleteComment, setDeleteComment] = useState(false);

  // Add New Reply
  const addNewReply = (id, content) => {
    if (!/\S/.test(content)) return;  
    let temp = data;
    currentId += 1;
    for (let comment of temp.comments) {
        if (comment.id === id) {
        comment.replies.push({
          'id': currentId + 1,
          'content': content,
          'createdAt': 'Just now',
          'score': 0,
          'replyingTo': comment.user.username,
          'user': {...data.currentUser}
        });
        break;
      }
      if (comment.replies.length > 0) {
        for (let reply of comment.replies) {
          if (reply.id === id) {
            comment.replies.push({
              'id': currentId + 1,
              'content': content,
              'createdAt': 'Just now',
              'score': 0,
              'replyingTo': reply.user.username,
              'user': {...data.currentUser}
            });
            break;
          }
        }
      }
    }
    setData({...temp}); 
  }

  // Update Score
  const updateScore = (id, action) => {
    let temp = data;
    for (let comment of temp.comments) {
      if (comment.id === id){
        action === 'upvote' ? comment.score += 1 : comment.score -= 1; 
        break;
      }
      if (comment.replies.length > 0) {
        for (let reply of comment.replies) {
          if (reply.id === id) {
            action === 'upvote' ? reply.score += 1 : reply.score -= 1; 
            break;
          }
        }
      }
    }
    setData({...temp});
  }

  // Update Comment
  const updateComment = (updatedContent, id) => {
    let temp = data;
    for (let comment of temp.comments) {
      if (comment.id === id) {
        comment.content = updatedContent;
        break;
      } 
      if (comment.replies.length > 0) {
        for (let reply of comment.replies) {
          if (reply.id === id) {
            reply.content = updatedContent;
            break;
          }
        }
      }
    }
    setData({...temp});
  }

  // Add New Comment
  const addNewComment = (content) => {
    if (!/\S/.test(content)) return;
    let temp = data;
    currentId += 1;
    temp.comments.push({
      'id': currentId + 1,
      'content': content,
      'createdAt': 'Just now',
      'score': 0,
      'user': {...data.currentUser},
      'replies': []
    });
    setData({...temp});
  }

  return (
    <div className='comments-column'>
      {data.comments.map((comment) => {
        return (
          {/* Comment Component */}
        )
      })}

      <NewComment 
        addNewComment={addNewComment}
        currentUser={data.currentUser}
      />
    </div>
  );
}

export default App;

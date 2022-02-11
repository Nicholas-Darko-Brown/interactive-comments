import { useEffect, useState } from "react";
import NewReply from "./newReply";
import "./comment.css";

const Comment = ({
  id,
  currentUser,
  replyingTo,
  comment,
  image,
  username,
  timeSince,
  score,
  replies,
  updateScore,
  updateComment,
  setDeleteComment,
  addNewReply,
}) => {
  const [newReply, setNewReply] = useState(false);
  const [upVote, setUpVote] = useState(false);
  const [downVote, setDownVote] = useState(false);
  const [iconPlus, setIconPlus] = useState("./images/icon-plus.svg");
  const [iconMinus, setIconMinus] = useState("./images/icon-minus.svg");

  const [edit, setEdit] = useState(false);
  const [current, setCurrent] = useState(false);

  // Evaluate to true or false and then render HTML accordingly
  useEffect(() => {
    const curr = username === currentUser.username;
    setCurrent(curr);
  }, [currentUser, username]);

  return (
    <>
      {
        <div className="comment">
          <div className="scoreColumn">
            {
              // Disable voting function for user's own comments
              current ? (
                <>
                  <img
                    className="flex-item upvote disabled-upvote"
                    src="./images/icon-plus.svg"
                    alt="upvote"
                  />
                  <span className="flex-item">{score}</span>
                  <img
                    className="flex-item downvote disabled-upvote"
                    src="./images/icon-minus.svg"
                    alt="downvote"
                  />
                </>
              ) : (
                <>
                  <img
                    className="flex-item upvote"
                    src={iconPlus}
                    alt="upvote"
                    onClick={() => {
                      if (!upVote) {
                        updateScore(id, "upvote");
                        setUpVote(true);
                        setIconPlus("./images/icon-plus-active.svg");
                        setIconMinus("./images/icon-minus.svg");
                      } else {
                        updateScore(id, "downvote");
                        setIconPlus("./images/icon-plus.svg");
                        setUpVote(false);
                      }
                    }}
                  />
                  <span className="flex-item">{score}</span>
                  <img
                    className="flex-item downvote"
                    src={iconMinus}
                    alt="downvote"
                    onClick={() => {
                      if (!downVote) {
                        updateScore(id, "downvote");
                        setDownVote(true);
                        setIconMinus("./images/icon-minus-active.svg");
                        setIconPlus("./images/icon-plus.svg");
                      } else {
                        updateScore(id, "upvote");
                        setIconMinus("./images/icon-minus.svg");
                        setDownVote(false);
                      }
                    }}
                  />
                </>
              )
            }
          </div>
          <div className="contentColumn">
            <div className="commentHeader">
              <img className="avatar" src={image} alt="avatar" />
              <div className="username">{username}</div>
              {current ? <div className="youTag">you</div> : ""}
              <div className="timestamp">{timeSince}</div>
              {current ? (
                edit !== false ? (
                  <>
                    <div className="deleteButton disabled">
                      <img src="./images/icon-delete.svg" alt="delete" />
                      <span> Delete</span>
                    </div>
                    <div className="editButton disabled">
                      <img src="./images/icon-edit.svg" alt="edit" />
                      <span> Edit</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="deleteButton"
                      onClick={() => setDeleteComment(id)}
                    >
                      <img src="./images/icon-delete.svg" alt="delete" />
                      <span> Delete</span>
                    </div>
                    <div
                      className="editButton"
                      onClick={() => setEdit(comment)}
                    >
                      <img src="./images/icon-edit.svg" alt="edit" />
                      <span> Edit</span>
                    </div>
                  </>
                )
              ) : (
                <div
                  className="replyButton"
                  onClick={() => {
                    setNewReply(true);
                  }}
                >
                  <img src="./images/icon-reply.svg" alt="reply" />
                  <span> Reply</span>
                </div>
              )}
            </div>

            {edit !== false ? (
              <>
                <div className="updateInput">
                  <textarea
                    defaultValue={edit}
                    onChange={(e) => {
                      setEdit(e.target.value);
                    }}
                    className="replyInput"
                    placeholder="Add a comment..."
                  />
                </div>

                <div className="updateRow">
                  <button
                    className="updateButton"
                    onClick={() => {
                      updateComment(edit, id);
                      setEdit(false);
                    }}
                  >
                    UPDATE
                  </button>
                </div>
              </>
            ) : (
              <div className="commentContent">
                {replyingTo.length > 0 ? (
                  <span className="reply-username">@{replyingTo} </span>
                ) : (
                  ""
                )}
                {comment}
              </div>
            )}
          </div>
        </div>
      }
      {newReply !== false && (
        <NewReply
          parentId={id}
          replyingTo={username}
          setNewReply={setNewReply}
          addNewReply={addNewReply}
          currentUser={currentUser}
        />
      )}
      {replies?.length > 0 &&
        replies.map((reply) => {
          return (
            <div className="commentReplies">
              <div className="verticalLine"></div>
              <Comment
                replyingTo={reply.replyingTo}
                addNewReply={addNewReply}
                updateComment={updateComment}
                setDeleteComment={setDeleteComment}
                updateScore={updateScore}
                key={reply.id}
                currentUser={currentUser}
                comment={reply.content}
                image={reply.user.image.png}
                username={reply.user.username}
                timeSince={reply.createdAt}
                score={reply.score}
                replies={reply.replies}
                id={reply.id}
              />
            </div>
          );
        })}
    </>
  );
};

export default Comment;

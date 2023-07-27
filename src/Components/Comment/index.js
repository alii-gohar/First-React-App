import { useState } from "react";

const Comment = (props) => {
  const loginUser = JSON.parse(localStorage.getItem("login"));
  const [isUpdating, setIsUpdating] = useState(false);
  const [commentValue, setCommentValue] = useState(props.data.body);

  const deleteComment = (id) => {
    const allComments = JSON.parse(localStorage.getItem("Comments")) || [];
    const postComments = allComments.find((commentObj) =>
      commentObj.hasOwnProperty(props.postId)
    )[props.postId];

    const afterDelComments = postComments.filter(
      (comment) => comment.id !== id
    );

    for (let i = 0; i < allComments.length; i++) {
      if (allComments[i][props.postId] !== undefined) {
        allComments[i][props.postId] = afterDelComments;
      }
    }
    localStorage.setItem("Comments", JSON.stringify(allComments));
    props.setShouldUpdate(true);
  };

  const updateComment = (id) => {
    const allComments = JSON.parse(localStorage.getItem("Comments")) || [];

    for (let i = 0; i < allComments.length; i++) {
      if (allComments[i][props.postId] !== undefined) {
        const postComments = allComments[i][props.postId];
        for (let i in postComments) {
          if (postComments[i]?.id === id) {
            postComments[i].body = commentValue;
          }
        }
      }
    }
    localStorage.setItem("Comments", JSON.stringify(allComments));

    props.setShouldUpdate(true);
    setIsUpdating(false);
  };

  return (
    <div
      key={props.data.id}
      className="border p-2 mb-2"
      style={{ margin: "10px auto", width: "100%" }}
    >
      <div className="d-flex justify-content-between">
        <h4 className="text-dark">{props.data.name} </h4>
        {props.data.email === loginUser && (
          <div className="buttons d-flex">
            {isUpdating ? (
              <i
                className="fa-solid fa-check postIcons"
                onClick={() => updateComment(props.data.id)}
              ></i>
            ) : (
              <>
                <i
                  className="fa-regular fa-pen-to-square mx-3 postIcons"
                  onClick={() => {
                    setIsUpdating(true);
                  }}
                ></i>
                <i
                  className="fa-solid fa-trash-can postIcons"
                  onClick={() => deleteComment(props.data.id)}
                ></i>
              </>
            )}
          </div>
        )}
      </div>
      <span>
        Email: <i>{props.data.email}</i>
      </span>
      {isUpdating === false ? (
        <p className="text-dark mx-2 border p-2">{props.data.body}</p>
      ) : (
        <input
          value={commentValue}
          style={{ width: "100%" }}
          onChange={(e) => setCommentValue(e.target.value)}
        />
      )}
    </div>
  );
};

export default Comment;

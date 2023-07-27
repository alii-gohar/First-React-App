import { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import Comment from "../Comment";

const Post = (props) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.data.title);
  const [editedContent, setEditedContent] = useState(props.data.body);
  const [isViewComments, setIsViewComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [fetchedComments, setFetchedComments] = useState(false);

  useEffect(() => {
    if (shouldUpdate) {
      viewComments(props.data.id);
      setShouldUpdate(false);
    }
    console.log("object rendering");
  }, [shouldUpdate, props.data.id]);

  // const loginUser = JSON.parse(localStorage.getItem("login"));

  const viewComments = async (postId) => {
    console.log("function called", postId);
    setIsViewComments(true);
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );
      let data = response.data;

      const allComments = JSON.parse(localStorage.getItem("Comments"));

      for (let i = 0; i < allComments.length; i++) {
        for (let comment in allComments[i]) {
          if (Number(comment) === postId) {
            data = allComments[i][comment].concat(data);
          }
        }
      }

      setComments(data); // Update the comments state with fetched data
      setFetchedComments(true);
    } catch (error) {
      console.error(error);
    }
  };

  const onClose = () => {
    setIsViewComments(false);
  };

  const handleEdit = () => {
    props.setIsOneUpdating(true);

    if (props.isOneUpdating === false) setIsUpdating(true);
  };

  const handleSave = (id) => {
    props.setIsOneUpdating(false);
    const allPost = JSON.parse(localStorage.getItem("Posts"));
    let userPost = [];
    allPost.forEach((post) => {
      if (post[props.loginUser] !== undefined) userPost = post[props.loginUser];
    });
    const newPost = {
      id: id,
      postOwner: props.loginUser,
      title: editedTitle,
      body: editedContent,
    };

    const updateUserPosts = userPost.map((post) => {
      return post.id === id ? newPost : post;
    });
    for (let i = 0; i < allPost.length; i++) {
      if (allPost[i][props.loginUser] !== undefined) {
        allPost[i][props.loginUser] = updateUserPosts;
      }
    }
    localStorage.setItem("Posts", JSON.stringify(allPost));
    setIsUpdating(false);
  };

   
  const deletePost = (id) => {
    const result = window.confirm("Do you want to delete Post?");
    if (result === true) {
      const allPost = JSON.parse(localStorage.getItem("Posts"));
      let userPost = [];
      allPost.forEach((post) => {
        if (post[props.loginUser] !== undefined)
          userPost = post[props.loginUser];
      });
      // console.log("user posts", userPost);
      const updateUserPosts = userPost.filter((post) => post.id !== id);
      // console.log("updated posts", updateUserPosts);
      for (let i = 0; i < allPost.length; i++) {
        if (allPost[i][props.loginUser] !== undefined) {
          allPost[i][props.loginUser] = updateUserPosts;
        }
      }

      localStorage.setItem("Posts", JSON.stringify(allPost));
      props.setIsPostDeleted(props.isPostDeleted === true ? false : true);
    }
  };

  const addComment = (postData, loginUser) => {
    const loginUserName = JSON.parse(localStorage.getItem("userName"));
    const allComments = JSON.parse(localStorage.getItem("Comments")) || [];
    const newComment = [
      {
        id: Math.random(),
        name: loginUserName,
        body: comment,
        email: loginUser,
      },
    ];
    let flag = true;
    for (let i = 0; i < allComments.length; i++) {
      if (allComments[i][postData.id] !== undefined) {
        allComments[i][postData.id] =
          allComments[i][postData.id].concat(newComment);
        flag = false;
      }
    }
    if (flag === true) allComments.push({ [postData.id]: newComment });
    localStorage.setItem("Comments", JSON.stringify(allComments));

    setComment("");
    setShouldUpdate(true);
  };

  return (
    <div className="post">
      <div className="post-header d-flex justify-content-between">
        {isUpdating ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            style={{ width: "95%" }}
          />
        ) : (
          <h1 className="post-title">{props.data.title}</h1>
        )}
        {props.data?.postOwner === props.loginUser && (
          <div className="buttons d-flex">
            {isUpdating ? (
              <i
                className="fa-solid fa-check postIcons"
                onClick={() => handleSave(props.data.id)}
              ></i>
            ) : (
              <>
                <i
                  className="fa-regular fa-pen-to-square mx-3 postIcons"
                  onClick={handleEdit}
                ></i>
                <i
                  className="fa-solid fa-trash-can postIcons"
                  onClick={() => deletePost(props.data.id)}
                ></i>
              </>
            )}
          </div>
        )}
      </div>
      {isUpdating ? (
        <div className="text-align-justify">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            style={{ width: "100%", minHeight: "150px" }}
          />
        </div>
      ) : (
        <div className="post-content text-align-justify">
          <p>{props.data.body}</p>
        </div>
      )}

      <div className="d-flex">
        <div className="flex-grow-1">
          <input
            className="form-control"
            placeholder="Add a Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button
          className="btn btn-primary mx-2"
          onClick={() => addComment(props.data, props.loginUser)}
        >
          Add Comment
        </button>
      </div>

      {isViewComments === false ? (
        <div className="d-flex">
          <button
            className="btn btn-success flex-grow-1 mt-3"
            onClick={() => viewComments(props.data.id)}
          >
            View Comments
          </button>
        </div>
      ) : (
        <>
          {fetchedComments ? (
            <div>
              <div className="my-2  d-flex justify-content-end">
                <button className="btn btn-danger" onClick={onClose}>
                  X
                </button>
              </div>
              <div className="comments-container">
                <h3 className="text-dark">Comments</h3>
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <Comment
                      key={comment.id}
                      data={comment}
                      postId={props.data.id}
                      shouldUpdate={shouldUpdate}
                      setShouldUpdate={setShouldUpdate}
                    />
                  ))
                ) : (
                  <div>
                    <h3>No Comments Yet</h3>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="d-flex justify-content-center align-items-center p-5 m-5">
              <h3>...Loading</h3>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Post;

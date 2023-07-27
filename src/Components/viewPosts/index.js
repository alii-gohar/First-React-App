import React, { useState, useEffect } from "react";
import Post from "../Post";
import { useLocation } from "react-router-dom";
import PopUpForm from "../PostForm";

const ViewPosts = () => {
  const [Posts, setPosts] = useState([]);
  const [isOneUpdating, setIsOneUpdating] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false); // State to manage the form pop-up.
  const [isPostDeleted, setIsPostDeleted] = useState(false);
  const loc = useLocation();

  const loginUser = JSON.parse(localStorage.getItem("login"));

  const addPost = () => {
    setIsAddFormOpen(true);
  };

  const handleFormSubmit = (formData) => {
    const userPost = JSON.parse(localStorage.getItem("Posts")) || [];
    const post = [
      {
        id: Math.random(),
        postOwner: loginUser,
        title: formData.title,
        body: formData.body,
      },
    ];

    let flag = true;
    for (let i = 0; i < userPost.length; i++) {
      if (userPost[i][loginUser] !== undefined) {
        userPost[i][loginUser] = userPost[i][loginUser].concat(post);
        flag = false;
      }
    }
    if (flag === true) userPost.push({ [loginUser]: post });

    localStorage.setItem("Posts", JSON.stringify(userPost));
  };
  const userPost = JSON.parse(localStorage.getItem("Posts")) || [];

  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        let allposts = [];
        console.log("length", userPost.length);
        for (let i = 0; i < userPost.length; i++) {
          for (let j in userPost[i]) {
            allposts = allposts.concat(userPost[i][j]);
          }
          // allposts = userPost[i][0];
        }
        allposts = allposts.concat(data);
        setPosts(allposts);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    const setHomePosts = () => {
      if (loginUser !== undefined) {
        userPost.forEach((post) => {
          if (post[loginUser] !== undefined) setPosts(post[loginUser]);
        });
      }
    };

    if (loc.pathname === "/viewposts") {
      fetchData("https://jsonplaceholder.typicode.com/posts");
    } else setHomePosts();

    // eslint-disable-next-line
  }, [isAddFormOpen, isOneUpdating, isPostDeleted]);

  return (
    <>
      {Posts.length > 0 ? (
        <div>
          {loc.pathname === "/home" && (
            <div className="d-flex justify-content-end mt-3 mx-3">
              <button className="btn btn-success" onClick={addPost}>
                +Add Post
              </button>
            </div>
          )}
          {Posts.length > 0 ? (
            Posts?.map((post) => (
              <div key={post.id}>
                <Post
                  data={post}
                  isOneUpdating={isOneUpdating}
                  setIsOneUpdating={setIsOneUpdating}
                  loginUser={loginUser}
                  setIsPostDeleted={setIsPostDeleted}
                  isPostDeleted={isPostDeleted}
                />
              </div>
            ))
          ) : (
            <h1 className="text-center pt-5">Sorry!! No Posts Found</h1>
          )}
          <PopUpForm
            isOpen={isAddFormOpen}
            onClose={() => setIsAddFormOpen(false)}
            onSubmit={handleFormSubmit}
          />
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center p-5 m-5">
          <h1>...Loading</h1>
        </div>
      )}
    </>
  );
};

export default ViewPosts;

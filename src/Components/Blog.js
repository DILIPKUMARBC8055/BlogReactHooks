//Blogging App using Hooks
import { type } from "@testing-library/user-event/dist/type";
import { useState, useRef, useEffect, useReducer } from "react";
function blogReducer(state, action) {
  switch (action.type) {
    case "Add":
      return [action.blog, ...state];
    case "Remove":
      return state.filter((blog, index) => index !== action.index);
    default:
      return state;
  }
}
export default function Blog() {
  //   const [title, setTitle] = useState("");
  //   const [about, setAbout] = useState("");
  const [formData, setFormData] = useState({ title: "", about: "" });

  //   const [blogs, setBlogs] = useState([]);
  //will be using useReduce
  const [blogs, setBlogs] = useReducer(blogReducer, []);
  const titleRef = useRef(null);
  useEffect(() => {
    titleRef.current.focus();
  }, []);
  useEffect(() => {
    if (blogs.length && blogs[0].title) document.title = blogs[0].title;
    else document.title = "no Blogs";
  });
  //Passing the synthetic event as argument to stop refreshing the page on submit
  function handleSubmit(e) {
    e.preventDefault();
    // setBlogs([{ title: formData.title, about: formData.about }, ...blogs]);
    setBlogs({
      type: "Add",
      blog: { title: formData.title, about: formData.about },
    });
    setFormData({ title: "", about: "" });
    console.log(blogs);
    titleRef.current.focus();
  }
  function handleDeleteBlog(i) {
    // setBlogs(blogs.filter((blog, index) => i !== index));
    setBlogs({ type: "Remove", index: i });
  }

  return (
    <>
      {/* Heading of the page */}
      <h1>Write a Blog!</h1>

      {/* Division created to provide styling of section to the form */}
      <div className="section">
        {/* Form for to write the blog */}
        <form onSubmit={handleSubmit}>
          {/* Row component to create a row for first input field */}
          <Row label="Title">
            <input
              className="input"
              placeholder="Enter the Title of the Blog here.."
              value={formData.title}
              onChange={(e) => {
                setFormData({ title: e.target.value, about: formData.about });
              }}
              ref={titleRef}
            />
          </Row>

          {/* Row component to create a row for Text area field */}
          <Row label="Content">
            <textarea
              className="input content"
              placeholder="Content of the Blog goes here.."
              value={formData.about}
              required
              onChange={(e) => {
                setFormData({ title: formData.title, about: e.target.value });
              }}
            />
          </Row>

          {/* Button to submit the blog */}
          <button className="btn">ADD</button>
        </form>
      </div>

      <hr />

      {/* Section where submitted blogs will be displayed */}
      <h2> Blogs </h2>
      <div class="container">
        {blogs.map((blog, index) => {
          return (
            <div class="blog-entry" key={index}>
              <h2 class="blog-title">{blog.title}</h2>
              <p class="blog-content">{blog.about}</p>
              <div class="buttonDiv">
                <button
                  class="delete-btn"
                  onClick={() => handleDeleteBlog(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

//Row component to introduce a new row section in the form
function Row(props) {
  const { label } = props;
  return (
    <>
      <label>
        {label}
        <br />
      </label>
      {props.children}
      <hr />
    </>
  );
}

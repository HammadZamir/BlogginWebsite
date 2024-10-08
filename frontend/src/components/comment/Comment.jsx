import { Button } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import myContext from "../../context/data/myContext";
import axios from "../../axios";
import useHandleInputChange from "../../hooks/useHandleInputChange";


function Comment({ id }) {
  const context = useContext(myContext);
  const { mode } = context;

  // const [comments, setComments] = useState({ author: "", text: "" });
  const [comments, handleInputChange, setComments] = useHandleInputChange({
    author: '',
    text: '',
  });

  const [commentBlog, setCommentBlog] = useState([]);

  //   console.log(commentBlog);

  // add new comments
  const addComment = async () => {
    try {
      // console.log("Comments are : " , comments)
      const res = await axios.post(`/blogs/${id}/comments`, comments);
      setComments({ author: "", text: "" });
    } catch (error) {
      console.log("error inside comment post method : ", error);
    }
  };

  // get comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const result = await axios.get(`/blogs/${id}/comments`);
        setCommentBlog(result.data.comment);
        // console.log(commentBlog);
      } catch (error) {
        console.log("error inside comment post method:", error);
      }
    };

    fetchComments();
  });

  // allComment.map((comment , index) => {
  //     console.log("comment is : ",comment);
  //   }
  // )

  return (
    <section className=" py-8 lg:py-16  w-full bg-gree-200">
      <div
        className={`border-b mb-8 ${
          mode === "dark" ? "border-gray-600" : "border-gray-400"
        }`}
      />
      <div className="  w-full  mx-auto px-4">
        <div className="flex justify-between  items-center mb-3">
          <h2
            className="text-lg lg:text-2xl font-bold"
            style={{ color: mode === "dark" ? "white" : "black" }}
          >
            Make Comment
          </h2>
        </div>

        {/* Comment Form  */}
        <form className="mb-6">
          {/* Full Name Input  */}
          <div
            className="py-2 px-4 mb-4 rounded-lg rounded-t-lg 
            shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] border border-gray-200"
            style={{
              background: mode === "dark" ? "#353b48" : "white",
            }}
          >
            <input
              name="author"
              value={comments.author}
              onChange={handleInputChange}
              type="text"
              placeholder="Enter Full Name"
              className="px-0 w-full font-semibold text-sm border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 "
              style={{
                background: mode === "dark" ? "#353b48" : "white",
              }}
            />
          </div>

          {/* Text Area  */}
          <div
            className="py-2 px-4 mb-4 rounded-lg rounded-t-lg 
          shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] border border-gray-200 "
            style={{
              background: mode === "dark" ? "#353b48" : "white",
            }}
          >
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              name="text"
              value={comments.text}
              onChange={handleInputChange}
              id="comment"
              rows={3}
              className="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 "
              style={{ background: mode === "dark" ? "#353b48" : "white" }}
              placeholder="What are your Thoughts?"
              required
              defaultValue={""}
            />
          </div>
          {/* Button  */}
          <div className="">
            <Button
              onClick={addComment}
              style={{
                background:
                  mode === "dark" ? "rgb(226, 232, 240)" : "rgb(30, 41, 59)",
                color:
                  mode === "dark" ? "rgb(30, 41, 59)" : "rgb(226, 232, 240)",
              }}
            >
              Post comment
            </Button>
          </div>
        </form>

        {/* Bottom Item  */}
        <article
          className="p-6 mb-10 text-base rounded-lg "
          style={{
            background: mode === "dark" ? "#353b48" : "rgb(226, 232, 240)",
          }}
        >
          {commentBlog.map((comment, index) => {
            // console.log(comment)
            const { author, text, date } = comment;
            return (
              <>
                <footer className="flex  justify-between items-center mb-">
                  <div className="flex items-center my-2 bg-white px-2 py-1 rounded-lg ">
                    <p
                      className="inline-flex items-center mr-3 text-lg  "
                      style={{ color: mode === "dark" ? "black" : "black" }}
                    >
                      {author}
                    </p>
                    <p
                      className="text-sm "
                      style={{ color: mode === "dark" ? "black" : "black" }}
                    >
                      {new Date(date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </footer>
                <p
                  className="text-gray-500 dark:text-gray-400 text-md"
                  style={{ color: mode === "dark" ? "white" : "black" }}
                >
                  ↳ {text}
                </p>

              <div className={`border-b my-5 ${mode === 'dark' ? 'border-gray-600' : 'border-gray-400'}`}/>

              </>
            );
          })}
        </article>
      </div>
    </section>
  );
}

export default Comment;

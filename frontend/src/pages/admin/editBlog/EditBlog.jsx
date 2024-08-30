import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button, Input, Typography } from "@material-tailwind/react";
import myContext from "../../../context/data/myContext";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Editor } from "@tinymce/tinymce-react";
import axios from "../../../axios";
import useHandleInputChange from '../../../hooks/useHandleInputChange';
import Loader from "../../../components/loader/Loader";
import { toast } from "react-toastify";



function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { mode , setLoading , loading } = context;

  const [thumbnail, setThumbnail] = useState();
  const [blog, handleInputChange, setBlog] = useHandleInputChange({
    title: '',
    category: '',
    content: '',
  });

//   console.log(blog)

  // console.log(thumbnail)
  // const [blog, setBlog] = useState({
  //   title: "",
  //   category: "",
  //   content: "",
  // });

  // console.log(blog)

  // get data 
  const fetchData = async () => {
    try {
      const res = await axios.get(`/blogs/${id}`);
      setBlog(res.data);
    //   console.log("data :" , res.data);
    } catch (error) {
      console.log("Error is", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);




  // post, update data
  const handleUpdate = async (e) => {

    e.preventDefault();

    setLoading(true)
  
    const formData = new FormData();


    formData.append("uid", blog.uid);
    formData.append("title", blog.title);
    formData.append("content", blog.content);
    formData.append("category", blog.category);
    
    // Only append the thumbnail if it has been changed
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }
  
    try {
      // Send the formData directly in the PUT request
      await axios.put(`/blogs/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success("Blog Updated Successfully!" , {
        position: "top-center",
        autoClose: 2000,
      })

      navigate('/dashboard');
    } catch (error) {
      console.error("Error updating blog:", error.response ? error.response.data : error.message);
      // Handle the error state if needed
    }
    setLoading(false)
  };
  



 

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setBlog({ ...blog, [name]: value });
  // };



  return (
    <div className=' container mx-auto max-w-5xl py-6'>
    <div className="p-5" style={{
        background: mode === 'dark'
            ? '#353b48'
            : 'rgb(226, 232, 240)',
        borderBottom: mode === 'dark'
            ? ' 4px solid rgb(226, 232, 240)'
            : ' 4px solid rgb(30, 41, 59)'
    }}>
        {/* Top Item */}
        <div className="mb-2 flex justify-between">
            <div className="flex gap-2 items-center">
                <Link to={'/dashboard'}>
                    <BsFillArrowLeftCircleFill className={mode === "dark" ? "text-white" : "text-black"} size={25} />
                </Link>
                <Typography
                    variant="h4"
                    style={{
                        color: mode === 'dark'
                            ? 'white'
                            : 'black'
                    }}
                >
                    Edit Blog
                </Typography>
            </div>
        </div>

        {/* Thumbnail */}
        <div className="mb-3">
            <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-semibold"
                style={{ color: mode === 'dark' ? 'white' : 'black' }}
            >
                Current Thumbnail
            </Typography>
            {blog.thumbnail && <img className=" w-full rounded-md mb-3 "
                src={blog.thumbnail}
                alt="thumbnail"
            />}
            <input
                required
                type="file"
                name='thumbnail'
                className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] placeholder-black w-full rounded-md p-1"
                style={{
                    background: mode === 'dark'
                        ? '#dcdde1'
                        : 'rgb(226, 232, 240)'
                }}
                onChange={(e) => setThumbnail(e.target.files[0])}
            />
        </div>

        {/* Title */}
        <div className="mb-3">
            <input
                required
                name="title"
                value={blog.title}
                onChange={handleInputChange}
                className={`shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5 
                 outline-none ${mode === 'dark'
                        ? 'placeholder-black'
                        : 'placeholder-black'}`}
                placeholder="Enter Your Title"
                style={{
                    background: mode === 'dark'
                        ? '#dcdde1'
                        : 'rgb(226, 232, 240)'
                }}
            />
        </div>

        {/* Category */}
        <div className="mb-3">
            <input
                required
                name="category"
                value={blog.category}
                onChange={handleInputChange}
                className={`shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5 
                 outline-none ${mode === 'dark'
                        ? 'placeholder-black'
                        : 'placeholder-black'}`}
                placeholder="Enter Your Category"
                style={{
                    background: mode === 'dark'
                        ? '#dcdde1'
                        : 'rgb(226, 232, 240)'
                }}
            />
        </div>

        {/* Editor */}
        <Editor
            apiKey="y964d9nfrprzdo4o7h7dj68slrlicpd6v2xbersyn02zrhx5"
            value={blog.content}
            onEditorChange={(newValue) => {
                setBlog({ ...blog, content: newValue });
            }}
            init={{
                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate tableofcontents footnotes mergetags autocorrect typography inlinecss markdown'
            }}
        />

        {/* Submit Button */}
        <Button className="w-full mt-5 mb-3"
            style={{
                background: mode === 'dark'
                    ? 'rgb(226, 232, 240)'
                    : 'rgb(30, 41, 59)',
                color: mode === 'dark'
                    ? 'rgb(30, 41, 59)'
                    : 'rgb(226, 232, 240)'
            }}
            onClick={handleUpdate}
        >
            {loading ? <Loader /> : "Update Blog"}
        </Button>
    </div>
</div>

  );
}

export default EditBlog;

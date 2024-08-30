import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../../components/layout/Layout'
import myContext from '../../../context/data/myContext';
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from '../../../axios';
import { toast } from "react-toastify";
    

function Dashboard() {

    const context = useContext(myContext);
    const { mode ,blogs } = context;

    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [profession , setProfession] = useState('')
    const [userID , setUserID] = useState('')


    // filter blogs by the current users ID
    const userBlog = blogs.filter(blog => blog.uid === userID);
    // count numbers of blogs by logn user
    const userBlogCount = userBlog.length;



    const navigate = useNavigate();

    useEffect(() => {
        setName(localStorage.getItem("name"));
        setEmail(localStorage.getItem("email"));
        setProfession(localStorage.getItem("profession"));
        setUserID(localStorage.getItem("id"));

    }, []);


    const handleDeleteBlog = async (id) => {
        try {
            await axios.delete(`/blogs/${id}`)
            toast.success("Blog Deleted Successfully!" , {
                position: "top-center",
                autoClose: 2000,
            })
        } catch (error) {
            console.log("error inside blog delete method:", error);
        }
    }



    const handleEditBlog = (id) => {
        const blogToEdit = blogs.find(blog => blog._id === id);
        if (blogToEdit) {
            // Navigate to the edit page and pass the blog data
            navigate(`/editblog/${id}`);
        }
    };


    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem('email')
        localStorage.removeItem('profession')
        localStorage.removeItem('id')
    setTimeout(() => {
      navigate("/");
    }, 1000);
    }


    return (
        <Layout>
            <div className="py-10">
                <div
                    className="flex flex-wrap justify-start items-center lg:justify-center gap-2 lg:gap-10 px-4 lg:px-0 mb-8">
                    <div className="left">
                        <img
                            className=" w-40 h-40  object-cover rounded-full border-2 border-pink-600 p-1"
                            src={'https://cdn-icons-png.flaticon.com/128/3135/3135715.png'} alt="profile"
                        />
                    </div>
                    <div className="right">
                        <h1
                            className='text-center font-bold text-2xl mb-2'
                            style={{ color: mode === 'dark' ? 'white' : 'black' }}
                        >
                            {name}
                        </h1>

                        <h2
                            style={{ color: mode === 'dark' ? 'white' : 'black' }} className="font-semibold">
                            {profession}
                        </h2>
                        <h2
                            style={{ color: mode === 'dark' ? 'white' : 'black' }} className="font-semibold">
                            {email}
                        </h2>
                        <h2
                            style={{ color: mode === 'dark' ? 'white' : 'black' }} className="font-semibold">
                            <span>Total Blog : </span>  {userBlogCount}
                        </h2>

                        <div className=" flex gap-2 mt-2">
                            <Link to={'/createblog'}>
                                <div className=" mb-2">
                                    <Button
                                        style={{
                                            background: mode === 'dark'
                                                ? 'rgb(226, 232, 240)'
                                                : 'rgb(30, 41, 59)',
                                            color: mode === 'dark'
                                                ? 'black'
                                                : 'white'
                                        }}
                                        className='px-8 py-2'
                                    >
                                        Create Blog
                                    </Button>
                                </div>
                            </Link>
                            <div className="mb-2">
                                <Button
                                    onClick={handleLogout}
                                    style={{
                                        background: mode === 'dark'
                                            ? 'rgb(226, 232, 240)'
                                            : 'rgb(30, 41, 59)',
                                        color: mode === 'dark'
                                            ? 'black'
                                            : 'white'
                                    }}
                                    className='px-8 py-2'
                                >
                                    Logout
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Line  */}
                <hr className={`border-2
                 ${mode === 'dark'
                     ? 'border-gray-300'
                     : 'border-gray-400'}` 
                 }
                />

                {/* Table  */}
                <div className="">
                    <div className=' container mx-auto px-4 max-w-7xl my-5' >
                        <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
                            {/* table  */}
                            <table className="w-full border-2 border-white shadow-md text-sm text-left text-gray-500 dark:text-gray-400" >
                                {/* thead  */}
                                <thead
                                    style={{
                                        background: mode === 'dark'
                                            ? 'white'
                                            : 'rgb(30, 41, 59)'
                                    }}
                                    className="text-xs ">
                                    <tr>
                                        {/* <th style={{ color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} scope="col" className="px-6 py-3">
                                            S.No
                                        </th> */}
                                        <th style={{ color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} scope="col" className="px-6 py-3">
                                            Thumbnail
                                        </th>
                                        <th style={{ color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} scope="col" className="px-6 py-3">
                                            Title
                                        </th>
                                        <th style={{ color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} scope="col" className="px-6 py-3">
                                            Category
                                        </th>
                                        <th style={{ color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} scope="col" className="px-6 py-3">
                                            Date
                                        </th>
                                        <th style={{ color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} scope="col" className="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                {/* tbody  */}
                                <tbody>
                                    {blogs.map((blog, index) => {
                                        if (userID === blog.uid) {
                                            return (
                                                <tr key={index} className="border-b-2" style={{ background: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }}>
                                                    
                                                    {/* S.No */}
                                                    {/* <td style={{ color: mode === 'dark' ? 'white' : 'black' }} className="px-6 py-4">
                                                        {`${index + 1}.`}
                                                    </td> */}

                                                    {/* Blog Thumbnail */}
                                                    <td style={{ color: mode === 'dark' ? 'white' : 'black' }} className="px-6 py-4">
                                                        <img className="w-16 rounded-lg" src={blog.thumbnail} alt="thumbnail" />
                                                    </td>

                                                    {/* Blog Title */}
                                                    <td style={{ color: mode === 'dark' ? 'white' : 'black' }} className="px-6 py-4">
                                                        {blog.title}
                                                    </td>
                                                    
                                                    {/* Blog Category */}
                                                    <td style={{ color: mode === 'dark' ? 'white' : 'black' }} className="px-6 py-4">
                                                        {blog.category}
                                                    </td>

                                                    {/* Blog Date */}
                                                    <td style={{ color: mode === 'dark' ? 'white' : 'black' }} className="px-6 py-4">
                                                    {new Date(blog.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                    </td>

                                                    {/* Delete Blog */}
                                                    <td style={{ color: mode === 'dark' ? 'white' : 'black' }} className="px-6 m-6 py-4">
                                                        <button
                                                            onClick={() => { handleEditBlog(blog._id) }}
                                                            className="px-4 m-2 py-1  rounded-lg text-white font-bold bg-blue-500">
                                                            Edit
                                                        </button>

                                                        <button
                                                            onClick={() => { handleDeleteBlog(blog._id) }}
                                                            className="px-4 m-2 py-1 rounded-lg text-white font-bold bg-red-500">
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>

                                            );
                                        } else {
                                            // Return null to not render anything if the condition is not met
                                            return null;
                                        }
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default Dashboard
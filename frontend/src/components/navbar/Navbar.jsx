import React, { useEffect, useState } from "react";
import { Navbar, Typography, IconButton, Avatar, Collapse} from "@material-tailwind/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShareAlt, AiOutlineSearch } from 'react-icons/ai'
import myContext from "../../context/data/myContext";
import SearchDialog from "../searchDialog/SearchDialog";
import ShareDialogBox from "../shareDialogBox/ShareDialog";

export default function Nav() {

    const [openNav, setOpenNav] = React.useState(false);
    const [uid , setUid] = useState(null)
    const context = useContext(myContext);
    const { mode, toggleMode } = context;


    useEffect(()=>{
        setUid(localStorage.getItem('id'))
    },[])


    // All NavList 
    const navList = (
        <ul className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
           <Typography
                as="li"
                variant="small"
                className="p-1 font-bold text-xl transition-colors duration-300 ease-in-out hover:text-blue-500"
                style={{ color: mode === 'dark' ? '#f0f4f8' : '#333' }}
            >
                <Link to={'/'}>Home</Link>
            </Typography>

            <Typography
                as="li"
                variant="small"
                className="p-1 font-bold text-xl transition-colors duration-300 ease-in-out hover:text-blue-500"
                style={{ color: mode === 'dark' ? '#f0f4f8' : '#333' }}
            >
                <Link to={'/allblogs'}>Blogs</Link>
            </Typography>

            {!uid &&
            <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-bold text-xl transition-colors duration-300 ease-in-out hover:text-blue-500"
            style={{ color: mode === 'dark' ? '#f0f4f8' : '#333' }}
            >
            <Link to={'/adminlogin'} className="flex items-center">
                Login
            </Link>
            </Typography>
            }

            {!uid && 
            <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-bold text-xl transition-colors duration-300 ease-in-out hover:text-blue-500"
            style={{ color: mode === 'dark' ? '#f0f4f8' : '#333' }}
            >
            <Link to={'/adminsignup'} className="flex items-center">
                Signup
            </Link>
            </Typography>
            }

        </ul>
    );

    return (
        <>
            {/* Navbar  */}
            <Navbar
                className={`sticky inset-0 z-20 h-max max-w-full border-none rounded-none py-2 px-6 lg:px-10 lg:py-2
                    ${mode === 'dark' ? 'bg-gray-900 text-gray-100 shadow-lg' : 'bg-gradient-to-r from-blue-500 to-teal-400 text-white shadow-md'}`}
                    >


                <div className="flex items-center justify-between">


                    <Link to={'/'}>
                        <Typography
                            as="a"
                            className="mr-4 cursor-pointer py-2 text-3xl font-bold flex gap-2 items-center"
                            style={{ color: mode === 'dark' ? '#e2e8f0' : '#ffffff' }}
                        >
                            {/* Logo Image  */}
                            <img
                                className=' w-14 h-14'
                                src='https://cdn-icons-png.flaticon.com/128/3685/3685253.png'
                            />
                            {/* Logo Text  */}
                            <span className="hidden md:inline">Blogging</span>
                        </Typography>
                    </Link>

                    {/* All Items  */}
                    <div className="flex items-center gap-6">

                        {/* Navlist  */}
                        <div className="hidden lg:flex">
                            {navList}
                        </div>

                        {/* Search Icon */}
                        <div className="cursor-pointer">
                            {/* <AiOutlineSearch size={20} color="white" /> */}
                            <SearchDialog/>
                        </div>

                        {/* Share Icon */}
                        {/* <div className="hidden lg:block">
                            {/* <AiOutlineShareAlt size={20} color="white" /> */}
                            {/* <ShareDialogBox/> */}
                        {/* </div> */} 

                        {/* Admin Profile Pic */}
                        <div>
                            <Link to={'/dashboard'}>
                                <div className="">
                                    <Avatar
                                        key={1}
                                        src={'https://cdn-icons-png.flaticon.com/128/3135/3135715.png'}
                                        alt="avatar"
                                        withBorder={true}
                                        className="w-12 h-12 border-4"
                                        style={{
                                            borderColor: mode === 'dark' ? '#1e293b' : '#ffffff'
                                        }}
                                    />
                                </div>
                            </Link>
                        </div>

                        {/* dark And Light Button */}
                        <div>
                            <IconButton onClick={toggleMode} className={`rounded-full p-2 transition-colors duration-300 ${mode === 'light' ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                                {mode === 'light'
                                    ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                                    </svg>
                                    : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                                    </svg>
                                }
                            </IconButton>
                        </div>

                        {/* Mobile Toggle  */}
                        <div>
                            <IconButton
                                className={`ml-auto h-10 w-10 text-inherit rounded-lg lg:hidden p-2 ${mode === 'light' ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                                ripple={false}
                                onClick={() => setOpenNav(!openNav)}
                            >
                                {openNav ?
                                    (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            className="h-6 w-6"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    )
                                    :
                                    (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        </svg>
                                    )}
                            </IconButton>
                        </div>

                    </div>
                </div>

                {/* Mobile View */}
                <Collapse open={openNav}>
                    {/* NavList  */}
                    {navList}
                </Collapse>
            </Navbar>
        </>
    );
}
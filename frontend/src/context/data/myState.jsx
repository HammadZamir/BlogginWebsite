import React, { useState , useEffect } from 'react'
import MyContext from './myContext';
import axios from '../../axios'


function MyState(props) {

    // Mode Handling
    const [mode, setMode] = useState('light'); // Whether dark mode is enabled or not
    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = 'rgb(17, 24, 39)';
        }
        else {
            setMode('light');
            document.body.style.backgroundColor = 'white';
        }
    }

    //states for loading and search
    const [searchKey , setSearchKey] = useState("");
    const [loading , setLoading] = useState(false)


    // Fetching all Blogs
    const [blogs, setBlogs] = useState([]); // for all blogs
    const [isError, setIsError] = useState("");

    // console.log(blogs);

    const fetchData = async () => {
      // setLoading(true);
        try {
          const res = await axios.get("/blogs");
          setBlogs(res.data);
        } catch (error) {
          setIsError(error.message);
          console.log(isError);
        }
        // setLoading(false);
      };
    
      useEffect(() => {
        fetchData();
      }, [blogs]);



    return (
        <MyContext.Provider value={{ 
            mode,
            toggleMode,
            blogs,
            loading,
            setLoading,
            searchKey,
            setSearchKey
            }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default MyState
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "../../../axios";

function Login() {
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [error , setError] = useState(null)

  const [passwordVisible, setPasswordVisible] = useState(false); // state for password visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/signin", loginInfo);
      const {success , message , profession , id , jwtToken , name , email} = res.data
      if(success){
        localStorage.setItem('token' , jwtToken)
        localStorage.setItem('name' , name)
        localStorage.setItem('email' , email)
        localStorage.setItem('profession' , profession)
        localStorage.setItem('id' , id)
      }
      setLoginInfo({ email: "", password: "" });
      // console.log("Login successful:", res.data);

      navigate('/dashboard');        // Redirect to a dashboard after successful login
    } catch (error) {
      console.error("Error during login:", error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data : error.message)
    }

  };


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center bg-gray-800 px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign In
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>

                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                    value={loginInfo.email}
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      onChange={handleChange}
                      type={passwordVisible ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      value={loginInfo.password}
                    />
                    <div
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    >
                      {passwordVisible ? (
                        <FaEyeSlash className="text-gray-500" />
                      ) : (
                        <FaEye className="text-gray-500" />
                      )}
                    </div>
                  </div>
                </div>
                {error && (
                    <p className="text-red-500 font-semibold text-sm">{error}</p>
                  )}
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign In
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account?{" "}
                  <button
                    className="font-medium text-blue-600 hover:underline dark:text-primary-500"
                    onClick={() => navigate("/adminsignup")}
                  >
                    Sign Up here
                  </button>
                </p>
              </form>
              {/* <ToastContainer /> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;




































// import React, { useContext, useState } from "react";
// import {Card,CardHeader,CardBody,Input, Button,Typography} from "@material-tailwind/react";
// import myContext from "../../../context/data/myContext";

// export default function AdminLogin() {
//     const context = useContext(myContext);
//     const { mode } = context;

//     return (
//         <div className="flex justify-center items-center h-screen">

//             {/* Card  */}
//             <Card
//                 className="w-full max-w-[24rem]"
//                 style={{
//                     background: mode === 'dark'
//                         ? 'rgb(30, 41, 59)'
//                         : 'rgb(226, 232, 240)'
//                 }}
//             >
//                 {/* CardHeader */}
//                 <CardHeader
//                     color="blue"
//                     floated={false}
//                     shadow={false}
//                     className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
//                     style={{
//                         background: mode === 'dark'
//                             ? 'rgb(226, 232, 240)'
//                             : 'rgb(30, 41, 59)'
//                     }}
//                 >
//                     <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-2 text-white">
//                         <div className=" flex justify-center">
//                             {/* Image  */}
//                             <img src="https://cdn-icons-png.flaticon.com/128/727/727399.png" className="h-20 w-20"
//                             />
//                         </div>
//                     </div>

//                     {/* Top Haeding  */}
//                     <Typography variant="h4" style={{
//                         color: mode === 'dark'
//                             ? 'rgb(30, 41, 59)'
//                             : 'rgb(226, 232, 240)'
//                     }}>
//                         Admin Login
//                     </Typography>
//                 </CardHeader>

//                 {/* CardBody */}
//                 <CardBody>
//                     <form className=" flex flex-col gap-4">
//                         {/* First Input  */}
//                         <div>
//                             <Input
//                                 type="email"
//                                 label="Email"
//                                 name="email"
//                             />
//                         </div>
//                         {/* Second Input  */}
//                         <div>
//                             <Input
//                                 type="password"
//                                 label="Password"
//                             />
//                         </div>
//                         {/* Login Button  */}
//                         <Button
//                             style={{
//                                 background: mode === 'dark'
//                                     ? 'rgb(226, 232, 240)'
//                                     : 'rgb(30, 41, 59)',
//                                 color: mode === 'dark'
//                                     ? 'rgb(30, 41, 59)'
//                                     : 'rgb(226, 232, 240)'
//                             }}>
//                             Login
//                         </Button>
//                     </form>
//                 </CardBody>
//             </Card>
//         </div>


//     );
// } 
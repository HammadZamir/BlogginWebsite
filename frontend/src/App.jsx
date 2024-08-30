import {BrowserRouter as Router, Route,Routes,} from "react-router-dom";
import {Navigate} from 'react-router-dom'
import Home from "./pages/home/Home";
import Blog from "./pages/blog/Blog";
import AllBlogs from "./pages/allBlogs/AllBlogs";
import NoPage from "./pages/nopage/NoPage";
import BlogInfo from "./pages/blogInfo/BlogInfo";
import MyState from "./context/data/myState";
import AdminLogin from "./pages/admin/adminLogin/AdminLogin";
import AdminSignUp from "./pages/admin/adminSignUp/AdminSignUp";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import CreateBlog from "./pages/admin/createBlog/CreateBlog";
import EditBlog from "./pages/admin/editBlog/EditBlog";
import {ToastContainer} from 'react-toastify' 
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/allblogs" element={<AllBlogs />} />
          <Route path="/bloginfo/:id" element={<BlogInfo />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/adminsignup" element={<AdminSignUp />} />

          <Route path="/dashboard" element={
            <ProtectedRouteForAdmin>
              <Dashboard />
            </ProtectedRouteForAdmin>
          } />
          
          <Route path="/createblog" element={
            <ProtectedRouteForAdmin>
              <CreateBlog />
            </ProtectedRouteForAdmin>
          } />

          <Route path="/editblog/:id" element={
            <ProtectedRouteForAdmin>
              <EditBlog />
            </ProtectedRouteForAdmin>
          } />

          <Route path="/*" element={<NoPage />} />

        </Routes>
      </Router>
      <ToastContainer />
    </MyState>
  )
}

export default App




export const ProtectedRouteForAdmin = ({ children }) => {

  const admin = localStorage.getItem('token');
    // console.log("Local Storage wala Token : " , admin );
  if (admin) {
    // console.log("Local Storage wala Email : " , admin.user.email );
    return children
  }
  else {
    return <Navigate to={'/adminlogin'}/>
  }
}


import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"
import './Layout.css'
import Category from "../components/Categoryes/Category"
import Footer from "../components/Footer/Footer"
const Layout = () => {
  return (
    <>
    
      <div className="mb-5">
        <Outlet />
      </div>
      <div className="footer-fixed mt-4">
        <Footer/>
      </div>
    </>
  )
}

export default Layout
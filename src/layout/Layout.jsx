
import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"
import './Layout.css'
import Category from "../components/Categoryes/Category"
import Footer from "../components/Footer/Footer"
const Layout = () => {
  return (
    <>
    
      <div >
        <Outlet />
      </div>
      <div className="footer-fixed ">
        {/* <Footer/> */}
      </div>
    </>
  )
}

export default Layout
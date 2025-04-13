
import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"
import './Layout.css'
const Layout = () => {
  return (
    <>
      <div className="navbar-fixed">
        <Navbar/>

      </div>
      <div className=" content-outltet">
        <Outlet />
      </div>
    </>
  )
}

export default Layout
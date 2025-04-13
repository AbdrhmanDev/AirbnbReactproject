
import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"

const Layout = () => {
  return (
    <>
      <div>
        <Navbar/>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default Layout
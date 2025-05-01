import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import Store from '../services/Store'
import Home from '../pages/Home/Home'
import Wishlist from '../pages/Wishlist/Wishlist'
import Details from '../pages/Details/Details'
import Filltration from '../pages/Filltration/Filltration'
import ShowAllImage from '../components/Details/ShowAllImage/ShowAllImage'
import Trip from '../components/Trips/Trip'
import UserInfo from '../components/Setting/Setting'
import ProfileCard from '../components/user/Profile'
import Account from '../pages/Account/Account'
import ProfileSection from '../features/ProfileSection/ProfileSection'
import Layout from '../Layout/Layout'
import ProfileAbout from '../features/ProfileAbout/ProfileAbout'
import Personalinfo from '../components/user/Personal info/Personalinfo'
import ModalLogin from '../components/Login/ModalLogin'

const RoutesPage = () => {

  
  const router = createBrowserRouter(
    [
      {
        path: '', element: <Layout/>, children: [
          {index:true,element:<Home />},
          {path:'wishlist',element:<Wishlist/>},
          {path:'/details/:id',element:<Details/>},
          {path:'/Filter',element:<Filltration/>},
          {path:'/images',element:<ShowAllImage/>},  
          {path:'/Login',element:<ModalLogin/>},
          {path:'/Trips',element:<Trip/>},
          {
            path: '/account',
            element: <Account />,  // دي تعرض الـ <Outlet />
            children: [
              {
                index: true,
                element: <UserInfo />,  
              },
              { path: "Profile", element: <ProfileCard /> },
              { path: "ProfileAbout", element: <ProfileAbout/> },
              { path: "ProfileSection", element:<ProfileSection/> },
              { path: "personal-info", element: <div> <Personalinfo/> </div> },
              { path: "login-security", element: <div>Login & Security Page</div> },
              { path: "payments", element: <div>Payments Page</div> },
              { path: "taxes", element: <div>Taxes Page</div> },
              { path: "notifications", element: <div>Notifications Page</div> },
              { path: "privacy", element: <div>Privacy Page</div> },
              { path: "global-preferences", element: <div>Global Preferences Page</div> },
              { path: "travel", element: <div>Travel Page</div> },
              { path: "hosting-tools", element: <div>Hosting Tools Page</div> },
              { path: "referrals", element: <div>Referrals Page</div> }
            ]
          }
          
        ]
      },
      { path: '*', element: <h1>404</h1> },
    ]

  )
  return (
    <>

      <Provider store={Store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  )
}

export default RoutesPage
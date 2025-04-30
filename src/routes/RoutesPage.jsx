import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Provider } from 'react-redux'

import Category from '../components/Categoryes/Category'
import Layout from '../layout/Layout'
import Store from '../services/Store'
import Card from '../components/Card/Card'
import Home from '../pages/Home/Home'
import Wishlist from '../pages/Wishlist/Wishlist'
import Details from '../pages/Details/Details'
import Filltration from '../pages/Filltration/Filltration'
import PhoneOtpComponent from '../components/Login/PhoneNumberForm'
import ShowAllImage from '../components/Details/ShowAllImage/ShowAllImage'
import Trip from '../components/Trips/Trip'
import TripCard from '../components/Trips/TripCard'
import MessagesPage from '../components/Message/MessagesPage'
import GiftPage from '../pages/GiftPage/GiftPage'
import HostHome from '../pages/HostHome/HostHome'



const RoutesPage = () => {


  const router = createBrowserRouter(
    [
      {
        path: '', element: <Layout />, children: [
          { index: true, element: <Home /> },
          { path: 'wishlist', element: <Wishlist /> },
          { path: '/details/:id', element: <Details /> },
          { path: '/Filter', element: <Filltration /> },
          { path: '/images', element: <ShowAllImage /> },
          { path: '/Login', element: <PhoneOtpComponent /> },
          { path: '/Trips', element: <Trip /> },
          { path: '/MessagesPage', element: <MessagesPage /> },
          { path: '/GiftPage', element: <GiftPage /> },
          { path: '/HostHome', element: <HostHome /> }
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
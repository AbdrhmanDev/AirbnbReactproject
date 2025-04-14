import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Provider } from 'react-redux'

import Category from '../components/Categoryes/Category'
import Layout from '../layout/Layout'
import Store from '../services/Store'
import Card from '../components/Card/Card'
import Home from '../pages/Home/Home'
import Trip from '../components/Trip/Trip'


const RoutesPage = () => {


  const router = createBrowserRouter(
    [
      {
        path: '', element: <Layout />, children: [
          { index: true, element: <Home /> },
          { path: '/wishlist', element: <Card /> },
          { path: '/trip', element: <Trip /> },
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
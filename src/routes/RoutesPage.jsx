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
import Layout from '../layout/Layout'
import ProfileAbout from '../features/ProfileAbout/ProfileAbout'
import Personalinfo from '../components/user/Personal info/Personalinfo'
import ModalLogin from '../components/Login/ModalLogin'
import CheckOut from '../pages/CheckOut/CheckOut'
import PaymentSuccess from '../pages/Payment/PaymentSuccess'
import ConfirmBooking from '../components/Trips/ConfirmBooking/ConfirmBooking'
import MessagesPage from '../pages/MessagesPage/MessagesPage'
import GiftPage from '../pages/GiftPage/GiftPage'
import HostHome from '../pages/HostHome/HostHome'
import TaxesPage from '../components/TaxesPage/TaxesPage'
import Notifications from '../components/Notifications/Notifications'
import PrivacyPage from '../components/PrivacyPage/PrivacyPage'
import GlobalPreferences from '../components/GlobalPreferences/GlobalPreferences'
import TravelForWork from '../components/TravelForWork/TravelForWork'
import ProfessionalHostingTools from '../components/ProfessionalHostingTools/ProfessionalHostingTools'
import ReferralCard from '../components/ReferralCard/ReferralCard'
import LoginSecurity from '../components/Setting/login-security'
import Payment from '../components/Setting/paymnt'
import HeroSection from '../components/HostExperience/HeroSection'
import Chat from '../components/ChatAi/Chat'
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
          { path: '/Login', element: <ModalLogin /> },
          { path: '/Trips', element: <Trip /> },
          { path: '/payment/success', element: <PaymentSuccess /> },
          { path: '/Trips/details', element: <ConfirmBooking /> },
          { path: '/giftCards', element: <GiftPage /> },
          { path: "/referrals", element: <ReferralCard /> },
          { path: '/hostHomePage', element: <HostHome /> },
          { path: '/HostExperience', element: <HeroSection /> },
          { path: "/chat", element: <Chat /> },
          { path: "/messages", element: <MessagesPage /> }, // Shows all conversations
          { path: "/messages/:id", element: <MessagesPage /> }, // Shows specific conversation
          { path: "/user/:id/messages", element: <MessagesPage /> }, // Direct link to chat with specific user
          {
            path: '/account',
            element: <Account />,
            children: [
              {
                index: true,
                element: <UserInfo />,
              },
              { path: "Profile", element: <ProfileCard /> },
              { path: "ProfileAbout", element: <ProfileAbout /> },
              { path: "ProfileSection", element: <ProfileSection /> },
              { path: "personal-info", element: <div> <Personalinfo /> </div> },
              { path: "login-security", element: <LoginSecurity /> },
              { path: "payments", element: <Payment /> },
              { path: "taxes", element: <TaxesPage /> },
              { path: "notifications", element: <Notifications /> },
              { path: "privacy", element: <PrivacyPage /> },
              { path: "global-preferences", element: <GlobalPreferences /> },
              { path: "travel", element: <TravelForWork /> },
              { path: "hosting-tools", element: <ProfessionalHostingTools /> },
              { path: "referrals", element: <ReferralCard /> }
            ]
          },
          { path: "book/stays", element: <CheckOut /> }
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
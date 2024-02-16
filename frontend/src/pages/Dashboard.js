import React from 'react'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const isNewUser = userInfo?.isNewUser

  return (
    <div>
      <h2>Welcome to the Dashboard</h2>
      <p>
        {isNewUser
          ? `Welcome, ${userInfo.firstName}  ${userInfo.lastName}!`
          : `Welcome back, ${userInfo.firstName}  ${userInfo.lastName}!`}
      </p>
      <p>
        This is your dashboard where you can view your payments, transactions,
        and other important information.
      </p>
      {/* Add your dashboard content here */}
    </div>
  )
}

export default Dashboard

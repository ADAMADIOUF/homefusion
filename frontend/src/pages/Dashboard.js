import React from 'react'
import { useSelector } from 'react-redux'

const Dashboard = ({ paymentInfo }) => {
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
      <div>
        {paymentInfo && paymentInfo.amount ? (
          <p>Payment total: {paymentInfo.amount}</p>
        ) : (
          <p>No payment information available</p>
        )}
      </div>
    </div>
  )
}

export default Dashboard

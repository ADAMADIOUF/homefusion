import React, { useState } from 'react'
import PayPalButton from './PayPalButton'
import { useSelector } from 'react-redux'
import { useSavePaymentDetailsMutation } from '../slices/proprietiesApiSlice'
import Dashboard from './Dashboard'

const Payment = () => {
  const [selectedPrice, setSelectedPrice] = useState(null)
  const [customAmount, setCustomAmount] = useState('')
  const { userInfo } = useSelector((state) => state.auth)
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false)
  const [paymentInfo, setPaymentInfo] = useState(null)
  const [isPaymentError, setIsPaymentError] = useState(false)
  const [isPayPalOpen, setIsPayPalOpen] = useState(true)
  const [savePaymentDetails, { isLoading: isSavingPayment }] =
    useSavePaymentDetailsMutation()

  const handleCustomAmountChange = (event) => {
    setCustomAmount(event.target.value)
  }

  const handleCustomAmountSubmit = (event) => {
    event.preventDefault()

    const amount = parseFloat(customAmount)
    if (!isNaN(amount) && amount > 0) {
      setSelectedPrice(amount)
    } else {
      alert('Please enter a valid amount.')
    }
  }

  const handleClosePayPal = () => {
    setIsPayPalOpen(false)
  }

  const handlePaymentSuccess = (order) => {
    setIsPaymentSuccess(true)
    setPaymentInfo({
      amount: order.purchase_units[0].amount.value,
      orderId: order.id,
      payerName: userInfo?.firstName || 'Unknown',
      payerEmail: userInfo?.email || 'Unknown',
    })

    savePaymentDetails({
      amount: order.purchase_units[0].amount.value,
      orderId: order.id,
      payerName: userInfo?.firstName || 'Unknown',
      payerEmail: userInfo?.email || 'Unknown',
    })
    setIsPayPalOpen(false)
  }

  const handlePaymentError = (err) => {
    setIsPaymentError(true)
    console.error('Payment error:', err)
  }

  return (
    <div className='section-center gift'>
      <div className='container-gift'>
        <article className='gift-details'>
          <h3>Welcome to HomeFusion Payment</h3>
          <p>
            {userInfo ? (
              <>
                Welcome, {userInfo.firstName} {userInfo.lastName}!<br />
                Phone Number: {userInfo.phoneNumber}
                <br />
                Address: {userInfo.propertyAddress}
              </>
            ) : (
              <>Loading user info...</>
            )}
          </p>
          <div className='gift-button'>
            <form onSubmit={handleCustomAmountSubmit}>
              <input
                type='number'
                value={customAmount}
                onChange={handleCustomAmountChange}
                placeholder='Enter amount'
              />
              <button type='submit'>Set Amount</button>
            </form>
            {isPayPalOpen && selectedPrice && (
              <PayPalButton
                amount={selectedPrice}
                onApprove={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            )}
            <button onClick={handleClosePayPal} className='btn-close'>
              Close PayPal
            </button>
            {isPaymentSuccess && (
              <p className='success-message'>
                Thank you, {paymentInfo.payerName}, your payment of $
                {paymentInfo.amount} was successful! Order ID:{' '}
                {paymentInfo.orderId}
              </p>
            )}
            {isPaymentError && (
              <p className='error-message'>
                An error occurred while processing the payment. Please try
                again.
              </p>
            )}
          </div>
        </article>
      </div>
      <div className='gift-big-img'></div>
      <Dashboard paymentInfo={paymentInfo} />
    </div>
  )
}

export default Payment

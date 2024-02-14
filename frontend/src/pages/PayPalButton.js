// PayPalButton.js
import React, { useEffect, useRef, useState } from 'react'

const PayPalButton = ({ amount, onApprove }) => {
  const [sdkReady, setSdkReady] = useState(false)
  const paypalRef = useRef()

  useEffect(() => {
    const addPayPalScript = () => {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}`
      script.onload = () => setSdkReady(true)
      document.body.appendChild(script)
    }

    if (window.paypal) {
      setSdkReady(true)
    } else {
      addPayPalScript()
    }
  }, [])

  useEffect(() => {
    if (sdkReady) {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount.toFixed(2),
                  },
                },
              ],
            })
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture()
            onApprove(order)
          },
        })
        .render(paypalRef.current)
    }
  }, [sdkReady, amount, onApprove])

  return <div ref={paypalRef}></div>
}

export default PayPalButton

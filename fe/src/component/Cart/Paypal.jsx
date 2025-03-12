import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import React from 'react'
const Paypal = ({ amount, onSuccess, onError }) => {
    return (
        <PayPalScriptProvider options={{
            "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
        }}>
            <PayPalButtons style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [{ amount: { value: parseFloat(amount).toFixed(2) } }]
                    })
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then(onSuccess)
                }}
                onError={onError}
            >

            </PayPalButtons>
        </PayPalScriptProvider>
    )
}

export default Paypal
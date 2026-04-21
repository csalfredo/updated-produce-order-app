// pages/SendEmail.js
import React, { useState } from 'react';

const SendEmail = ({ orderItems, totalAmount }) => {
  const [response, setResponse] = useState(null);

  console.log("INSIDE SENDEMAIL COMPONENT", orderItems);

  const sendEmail = async () => {
    const payload = {
      items: orderItems.map(item => ({
        name: item.name,
        quantity: item.Qty,
        case_cost: item.case_cost,
        total: item.case_cost * item.Qty
      }))
    };

    try {
      const res = await fetch('http://localhost:8000/api/send-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      setResponse(result);
      console.log('Email sent:', result);
    } catch (error) {
      console.error('Error sending email:', error);
      setResponse({ status: 'error', message: error.message });
    }
  };

  return sendEmail(); // Auto-send when component renders
};

export default SendEmail;

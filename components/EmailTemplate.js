// components/EmailTemplate.jsx
import React from 'react';

const EmailTemplate = ({ name, product }) => (
  <div>
    <h1>Order Confirmation</h1>
    <p>Hello {name},</p>
    <p>Thank you for your order of {product}. We will process it shortly.</p>
  </div>
);

export default EmailTemplate;

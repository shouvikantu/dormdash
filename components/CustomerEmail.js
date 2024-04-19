import { Html, Heading, Text } from "@react-email/components";

const CustomerEmail = ({ customerName, orderDetails }) => (
  <Html>
    <Heading>Order Confirmation</Heading>
    <Text>Hi {customerName},</Text>
    <Text>Thank you for your order! Here are your order details:</Text>
    <Text>{orderDetails}</Text>
  </Html>
);

export default CustomerEmail;

import { Html, Heading, Text } from "@react-email/components";

const SellerEmail = ({ productName, quantity }) => (
  <Html>
    <Heading>New Order Received</Heading>
    <Text>A new order has been placed:</Text>
    <Text>Product: {productName}</Text>
    <Text>Quantity: {quantity}</Text>
  </Html>
);

export default SellerEmail;

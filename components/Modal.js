import { collection, doc, setDoc } from 'firebase/firestore';
import Image from 'next/image';
import { db } from '@/firebase.config';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';

function Modal({ product, onClose }) {
  const { user } = useAuth();
  const router = useRouter();

  // const addOrderToFirestore = async (orderDetails) => {
  //   const orderRef = collection(db, `users/${product.sellerId}/Foods/${product.id}/orders`);
  //   await setDoc(doc(orderRef), orderDetails);
  // };

  // const sendOrderConfirmationEmail = async (orderDetails) => {
  //   const response = await fetch('/api/sendEmail', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(orderDetails),
  //   });
  //   return response.json();
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const name = event.target.elements.name.value;
    const dormName = event.target.elements.dormName.value;
    const roomNumber = event.target.elements.roomNumber.value;
  
    const orderDetails = {
      name,
      dormName,
      roomNumber,
      orderedAt: new Date(),
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      customerEmail: user.email, // This should ideally be fetched from user data or form
      sellerEmail: product.sellerEmail // Ensure this is fetched correctly
    };
  
    // Check if any field is undefined
    if (!orderDetails.sellerEmail) {
      console.error('Seller email is undefined');
      return; // Stop the function if sellerEmail is undefined
    }
  
    try {
      const orderRef = collection(db, `users/${product.sellerId}/Foods/${product.id}/orders`);
      await setDoc(doc(orderRef), orderDetails);
      const emailResponse = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });
  
      const responseData = await emailResponse.json();
      router.push('/thank-you'); // Redirect to thank-you page
    } catch (error) {
      console.error('Error:', error);
    }
  };
  




  if (!product) return null;



  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm w-full relative transition duration-150 ease-in-out transform hover:scale-105">
        <button onClick={onClose} className="absolute top-0 right-0 p-2 text-2xl font-bold text-gray-600 hover:text-gray-800">✖️</button>
        <div className="w-[90%] h-48 overflow-hidden rounded-lg bg-gray-200 relative mb-4">
          <Image
            src={product.imageUrl}
            alt={product.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <h2 className="text-lg font-bold text-gray-900">{product.name}</h2>
        <p className="text-sm text-gray-600">{product.description}</p>
        <p className="text-md font-semibold text-gray-900">{product.price}</p>
        <form className="mt-4" onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" name="name" className="block w-full p-2 border mb-2" />
          <input type="text" placeholder="Dorm Name" name="dormName" className="block w-full p-2 border mb-2" />
          <input type="text" placeholder="Room #" name="roomNumber" className="block w-full p-2 border mb-2" />
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md">Order Now</button>
        </form>

      </div>
    </div>
  );
}

export default Modal;

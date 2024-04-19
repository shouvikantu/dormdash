// app/product/[id]/page.js
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import { db } from '@/firebase.config'; // Ensure this path is correctly configured
import Navbar from '@/components/Navbar';

export async function loader({ params }) {
  console.log("Loading product data for ID:", params.id);  // Debugging
  const productId = params.id;
  const docRef = doc(db, 'foods', productId);
  const docSnap = await getDoc(docRef);
  console.log("Fetched product data:", docSnap.data());  // Debugging

  if (!docSnap.exists()) {
    throw new Response('Not Found', { status: 404 });
  }

  return { product: { id: docSnap.id, ...docSnap.data() } };
}


export default function ProductPage({ product }) {  // Updated to directly destructure product from props
  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-700">{product.name}</h1>
        <div className="mt-4">
          <Image
            src={product.imageUrl}
            alt={product.name}
            layout='fill'
            className="object-cover object-center"
          />
          <p className="text-lg font-medium text-gray-900">{product.price}</p>
          <p className="text-sm text-gray-600">{product.description}</p>
        </div>
      </div>
    </div>
  );
}

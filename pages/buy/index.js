import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { db } from '@/firebase.config';
import { collectionGroup, getDocs, query } from 'firebase/firestore';
import Image from 'next/image';
import Modal from '@/components/Modal';

export default function Products() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    } else if (user) {
      fetchAllFoods();
    }
  }, [user, loading, router]);

  const fetchAllFoods = async () => {
    const q = query(collectionGroup(db, 'foods'));
    const querySnapshot = await getDocs(q);
    const productList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      sellerId: doc.ref.parent.parent.id
    }));
    setProducts(productList);
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-24 md:mt-10 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-gray-700 pb-4">All Products</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="cursor-pointer group" onClick={() => openModal(product)}>
              <div className="w-full h-64 overflow-hidden rounded-lg bg-gray-200 relative">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:opacity-75"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-sm text-gray-700">{product.name}</h3> by {product.sellerName}
                <p className="text-lg font-medium text-gray-900">{product.price}</p>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-sm text-gray-600">Time to cook: {product.timeToCook}</p>
              </div>
            </div>
          ))}
        </div>
        {showModal && (
          <Modal product={selectedProduct} onClose={() => setShowModal(false)} />
        )}
      </div>
    </div>
  );
}

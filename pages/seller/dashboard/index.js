'use client'
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { doc, getDoc, collection, addDoc, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { db, storage } from '@/firebase.config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

export default function SellerDashboard() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [foods, setFoods] = useState([]);
    const [foodName, setFoodName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [timeToCook, setTimeToCook] = useState('');
    const [image, setImage] = useState(null);
    const [loadIng, setLoading] = useState(false);

    const loadFoods = useCallback(async () => {
        if (!user) return; // Guard clause if user is undefined
        const foodsRef = collection(db, "users", user.uid, "foods");
        const foodsSnap = await getDocs(foodsRef);
        setFoods(foodsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, [user, db]); 

    useEffect(() => {
        if (!loading) {
            if (user) {
                const fetchData = async () => {
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists() && docSnap.data().isSeller) {
                        setFullName(docSnap.data().fullName);
                        setEmail(docSnap.data().email);
                        loadFoods();
                    } else {
                        // User document does not have isSeller or does not exist
                        router.push('/');
                    }
                };
                fetchData();
            } else {
                // No user is logged in, redirect to login page
                router.push('/login');
            }
        }
    }, [user, loading, router, loadFoods]);
    


    const handleAddFood = async (e) => {
        e.preventDefault();
        setLoading(true);
        let imageUrl = '';
        
        if (image) {
            const imageRef = ref(storage, `foods/${user.uid}/${new Date().getTime()}_${image.name}`);
            const snapshot = await uploadBytes(imageRef, image);
            imageUrl = await getDownloadURL(snapshot.ref);
        }

        if (!user || !user.email) {
            console.error("No user email available to store with the food item.");
            setLoading(false);
            return;
        }
    
        const foodsRef = collection(db, "users", user.uid, "foods");
        await addDoc(foodsRef, {
            name: foodName,
            description,
            price: `$${price}`,
            timeToCook: `${timeToCook} minutes`,
            imageUrl,
            sellerName: fullName, 
            sellerEmail: user.email,
            orderCount: 0 
        });
    
        // Reset form fields and states after submission
        setFoodName('');
        setDescription('');
        setPrice('');
        setTimeToCook('');
        setImage(null);
        setLoading(false);
        loadFoods();
    };
    

    const deleteFood = async (foodId) => {
        const foodRef = doc(db, "users", user.uid, "foods", foodId);
        try {
            await deleteDoc(foodRef);
            setFoods(foods.filter(food => food.id !== foodId));  // Update local state to reflect deletion
        } catch (error) {
            console.error("Error removing food item: ", error);
        }
    };
    

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 md:px-48 py-10 pt-32">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">Seller Dashboard</h1>

                <div className="bg-white shadow-lg rounded-lg p-8 mb-10">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-6">Account Information</h2>
                    <p className="text-lg text-gray-600"><strong>Name:</strong> {fullName}</p>
                    <p className="text-lg text-gray-600 mb-6"><strong>Email:</strong> {email}</p>

                    <h2 className="text-2xl font-semibold text-gray-700 mb-6">Add New Food Item</h2>
                    <form className="space-y-6" onSubmit={handleAddFood}>
                        <div>
                            <label htmlFor="foodName" className="block text-sm font-medium text-gray-900">Food Name</label>
                            <input
                                id="foodName"
                                name="foodName"
                                type="text"
                                required
                                value={foodName}
                                onChange={e => setFoodName(e.target.value)}
                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-900">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                required
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>

                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-900">Price (USD)</label>
                            <input
                                id="price"
                                name="price"
                                type="text"
                                required
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>

                        <div>
                            <label htmlFor="timeToCook" className="block text-sm font-medium text-gray-900">Time to Cook (minutes)</label>
                            <input
                                id="timeToCook"
                                name="timeToCook"
                                type="text"
                                required
                                value={timeToCook}
                                onChange={e => setTimeToCook(e.target.value)}
                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>

                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-900">Image</label>
                            <input
                                id="image"
                                name="image"
                                type="file"
                                onChange={e => setImage(e.target.files[0])}
                                className="mt-1 p-2 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Add Food
                            </button>
                        </div>
                    </form>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-6">Your Foods</h2>
                    <div className="space-y-4">
                        {foods.map(food => (
                            <div key={food.id} className="p-4 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-lg font-medium text-gray-900">Name: {food.name}</p>
                                        <p className="text-sm text-gray-600">Description: {food.description}</p>
                                        <p className="text-sm text-gray-600">Price: {food.price}</p>
                                        <p className="text-sm text-gray-600">Time to Cook: {food.timeToCook}</p>
                                        <p className="text-sm text-gray-600">Order Count: {food.orderCount}</p>
                                    </div>
                                    {food.imageUrl && (
                                        <Image width={200} height={200} src={food.imageUrl} alt={food.name} className="ml-4 max-w-xs rounded-md shadow-sm" />
                                    )}
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={() => deleteFood(food.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>

    );
}

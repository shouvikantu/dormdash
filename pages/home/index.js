'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase.config';
import Navbar from '@/components/Navbar';
import DormDash from '@/public/assets/dormdash.png';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function Page() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [fullName, setFullName] = useState('');

    useEffect(() => {
        if (!loading && !user) {
            router.push('/');
            return; // Prevent further execution if user is not logged in
        }

        if (user) {
            const fetchUserFullName = async () => {
                const userDocRef = doc(db, "users", user.uid);
                try {
                    const userDocSnap = await getDoc(userDocRef);
                    if (userDocSnap.exists()) {
                        setFullName(userDocSnap.data().fullName);
                    } else {
                        console.log("No such document!");
                    }
                } catch (error) {
                    console.error("Error fetching user document:", error);
                }
            };

            fetchUserFullName();
        }
    }, [user, loading, router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="relative isolate px-6 lg:px-8">
            <Navbar />
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
                <div className="mx-auto w-1/2 sm:w-1/3 lg:w-1/4">
                    <Image
                        className="rounded-lg shadow-lg"
                        src={DormDash}
                        alt="DormDash"
                        placeholder="blur" // Add this line if your image has a placeholder
                    />
                </div>
                <div className="mt-10">
                    <h3 className="text-4xl font-bold tracking-tight text-green-900 sm:text-2xl">
                        Welcome, {fullName || 'User'}!
                    </h3>
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Quick Dorm Deliveries, Anytime.
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        The easiest way to buy and sell food on campus.
                    </p>
                    <div className="mt-10 flex justify-center gap-4">
                        <Link href="/buy" className="rounded-md bg-indigo-600 px-5 py-3 text-base font-semibold text-white shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            Explore Now
                        </Link>
                        <Link href="/about" className="rounded-md border border-gray-300 px-5 py-3 text-base font-semibold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

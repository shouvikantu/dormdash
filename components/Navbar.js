'use client'
import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from "@/public/assets/logo.png"; 
import Image from 'next/image';
import { signOut } from 'firebase/auth';
import { auth,db } from '../firebase.config'; 
import { useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';



export default function Navbar() {

  const [userDetails, setUserDetails] = useState(null); // State to store user details
  useEffect(() => {
    if (auth.currentUser) {
      const fetchUserDetails = async () => {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data()); // Set user details from Firestore
        } else {
          console.log("No such document!");
        }
      };
      fetchUserDetails();
    }
  }, []);
  
  
  const navigation = [
    { name: 'Home', href: '/home' },
    { name: 'Buy Food', href: '/buy' },
    { name: 'About Us', href: '/about' },
    { name: 'How it Works', href: '#' },

  ];
  
  if (userDetails?.isSeller) {
    navigation.push({ name: 'Dashboard', href: '/seller/dashboard' });
  }

  



  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router  = useRouter();

  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/home" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image
                className="h-16 w-auto"
                src={logo}
                alt="Dormdash logo"
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <button onClick={handleLogout} className="rounded-md bg-red-600 px-5 py-3 text-base font-semibold text-white shadow hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
              Logout <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-75" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <Image
                className="h-16 w-auto"
                src={logo}
                alt="Dormdash logo"
              />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                {navigation.map((item) => (
                  <div key={item.name} className="space-y-6 py-6">
                    <Link
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}
                <div className="py-6">
                  <Link
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  );
}

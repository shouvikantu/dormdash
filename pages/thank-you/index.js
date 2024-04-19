import { useEffect } from 'react';
import { useRouter } from 'next/router';

function ThankYou() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/home'); // Redirect to the homepage after 5 seconds
    }, 5000);

    return () => clearTimeout(timer); // Clean up the timer if the component unmounts
  }, [router]);

  return (
    <div className="max-w-lg mx-auto text-center mt-20">
      <h1 className="text-2xl font-bold">Thank You for Your Order!</h1>
      <p>Your order has been successfully placed and confirmed. You will receive an email confirmation shortly.</p>
      <p>You will be redirected to the homepage in 5 seconds.</p>
    </div>
  );
}

export default ThankYou;

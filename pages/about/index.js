import Image from 'next/image';
import Link from 'next/link';
import dormdash from '@/public/assets/dormdash.png';
import Navbar from '@/components/Navbar';

export default function Page() {
  return (
    <>
    <Navbar />
    <section className="relative isolate overflow-hidden mt-10 bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <Image className="mx-auto h-24" src={dormdash} alt="" width={80} height={40} />
        <figure className="mt-10">
          <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
            <p>
            DormDash is an online food marketplace exclusively for Willamette University students. Our mission is to provide convenient, affordable, and delicious food options. Whether you&apos;re looking for a quick bite or a full meal, we&apos;ve got you covered. Our vendors offer a variety of options to satisfy your cravings.

            </p>
          </blockquote>
        </figure>
      </div>
    </section>
    </>
  )
}

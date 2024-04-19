import Image from 'next/image';
import Link from 'next/link';
import dormdash from '@/public/assets/dormdash.png';

export default function Page() {
  return (
    <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <Image className="mx-auto h-24" src={dormdash} alt="" width={80} height={40} />
        <figure className="mt-10">
          <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
            <p>
              “Please review the following documents carefully before registering to ensure you understand all terms and conditions.”
            </p>
          </blockquote>
        </figure>
        <div className="flex justify-center gap-4 mt-10 flex-col p-12 text-center sm:flex-row">
          <Link href="/assets/pdf/gen_release.pdf" passHref
             target="_blank" className="bg-indigo-600 text-white px-6 py-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors">General Release
          </Link>
          <Link href="/assets/pdf/indp_cont.pdf" passHref
             target="_blank" className="bg-indigo-600 text-white px-6 py-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors">Independent Contractor Agreement
          </Link>
        </div>
      </div>
    </section>
  )
}

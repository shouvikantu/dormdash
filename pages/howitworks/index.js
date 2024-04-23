import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import dormdash from '@/public/assets/dormdash.png'
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Sellers',
    description: (
      <span>
        are required to submit a Food Handler&apos;s license to <a href="mailto:wudormdash@gmail.com" className="text-indigo-600 hover:underline"> wudormdash@gmail.com</a> to sell homemade food or anything except pre-packaged food. SELLERS WHO DO NOT SUBMIT A FOOD HANDLERS LICENSE WILL HAVE POSTS DELETED. Food handlers license can be bought at <a href="https://oregonfoodhandler.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Foodhandler&apos;Card</a> for $9. DormDash will collect 5% for website upkeep.
      </span>
    ),
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Buyers',
    description: 'will also create accounts, with the option to also sign up as a seller. Buyers will go to "buy food" and from there will be able to purchase food that is currently posted. Buyers will receive a confirmation email when their order has gone through and be able to message the seller for pick-up.',
    icon: LockClosedIcon,
  },
  {
    name: 'All payments',
    description: ' will be through Venmo, Cash, or other payment apps for now.',
    icon: CurrencyDollarIcon,
  },
];

export default function HowItWorks() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl pt-12 my-auto grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">How it Works</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">WU DORMDASH</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
              Sellers will sign up as a seller when creating an account, and then post the food they are selling through the seller dashboard at the top of the page. Once the food is live, sellers can receive orders from buyers. Sellers will receive a confirmation email when an order has been placed and be able to message the buyer for pick-up. Sellers can stop receiving orders at any time by deleting their post.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <Image
            src={dormdash}
            alt="Product screenshot"
            className="w-[70%] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 w-[70%] md:-ml-4 lg:-ml-0"
            width={150}
            height={200}
          />
        </div>
      </div>
    </div>
  );
}

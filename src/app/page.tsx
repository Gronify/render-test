
import Image from 'next/image';
import Link from 'next/link';


const renderMethods = [
  { name: 'CSR', description: 'Client-Side Rendering', imgSrc: 'https://dummyjson.com/image/600x300/4B6663/ffffff?text=CCR&font=lobste', href: 'csr' },
  { name: 'SSR', description: 'Server-Side Rendering', imgSrc: 'https://dummyjson.com/image/600x300/4B6663/ffffff?text=SSR&font=lobster', href: 'ssr' },
  { name: 'SSG', description: 'Static Site Generation', imgSrc: 'https://dummyjson.com/image/600x300/4B6663/ffffff?text=SSG&font=lobster', href: 'ssg' },
  { name: 'Hybrid', description: 'Hybrid Rendering', imgSrc: 'https://dummyjson.com/image/600x300/4B66  63/ffffff?text=Hybrid&font=lobster', href: 'hybrid' },
];

const HomePage = () => {


  return (
    <div className="bg-gray-100 min-h-screen p-4">

      <h1 className="text-4xl font-bold mb-8 text-center" style={{ fontFamily: 'Roboto, sans-serif', color: '#111827' }}>
        Choose Rendering Method
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {renderMethods.map(method => (
          <Link href={method.href} key={method.name}>
            <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer transform hover:scale-105 transition-transform">
              <Image src={method.imgSrc} alt={method.name} className="w-full h-40 object-cover mb-4 rounded-lg" />
              <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Roboto, sans-serif', color: '#1F2937' }}>
                {method.name}
              </h2>
              <p style={{ fontFamily: 'Roboto, sans-serif', color: '#4B5563' }}>{method.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

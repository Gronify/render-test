import Link from 'next/link';

const dataOptions = [
  { name: 'Products', description: 'Explore our range of products', imgSrc: 'https://dummyjson.com/image/600x300/4B5563/ffffff?text=Products&font=lobster', href: 'products' },
  { name: 'Carts', description: 'View your shopping carts', imgSrc: 'https://dummyjson.com/image/600x300/4B5563/ffffff?text=Carts&font=lobster', href: 'carts' },
  { name: 'Recipes', description: 'Find delicious recipes', imgSrc: 'https://dummyjson.com/image/600x300/4B5563/ffffff?text=Recipes&font=lobster', href: 'recipes' },
  { name: 'Users', description: 'Meet our users', imgSrc: 'https://dummyjson.com/image/600x300/4B5563/ffffff?text=Users&font=lobster', href: 'users' },
  { name: 'Posts', description: 'Read our posts', imgSrc: 'https://dummyjson.com/image/600x300/4B5563/ffffff?text=Posts&font=lobster', href: 'posts' },
  { name: 'Comments', description: 'See user comments', imgSrc: 'https://dummyjson.com/image/600x300/4B5563/ffffff?text=Comments&font=lobster', href: 'comments' },
  { name: 'Todos', description: 'Manage your todos', imgSrc: 'https://dummyjson.com/image/600x300/4B5563/ffffff?text=Todos&font=lobster', href: 'todos' },
  { name: 'Quotes', description: 'Inspiring quotes', imgSrc: 'https://dummyjson.com/image/600x300/4B5563/ffffff?text=Quotes&font=lobster', href: 'quotes' },
];
const ServerSideRendering = async () => {

  return (
    <div className="bg-gray-100 min-h-screen p-4">

      <h1 className="text-4xl font-bold mb-8 text-center" style={{ fontFamily: 'Roboto, sans-serif', color: '#111827' }}>
        Choose Data Type to Render
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataOptions.map(option => (
          <Link href={option.href} key={option.name}>
            <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer transform hover:scale-105 transition-transform">
              <img src={option.imgSrc} alt={option.name} className="w-full h-40 object-cover mb-4 rounded-lg" />
              <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Roboto, sans-serif', color: '#1F2937' }}>
                {option.name}
              </h2>
              <p style={{ fontFamily: 'Roboto, sans-serif', color: '#4B5563' }}>{option.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>

  );
};

export default ServerSideRendering;

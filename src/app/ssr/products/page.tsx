import type { Product } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';


async function fetchProducts(): Promise<Product[]> {
  const response = await fetch("https://dummyjson.com/products", {
    cache: "no-store",
  });

  const data = await response.json();
  return data.products;
}

const Products = async () => {
  const products: Product[] = await fetchProducts();


  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <Link href="../" className="text-blue-500 hover:underline ">
        Back to List
      </Link>
      <h1 className="text-4xl font-bold mb-8 text-center" style={{ fontFamily: 'Roboto, sans-serif', color: '#111827' }}>
        Products



      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map(product => (
          <Link href={`${product.id}/`} key={product.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-shadow duration-200   ">

            <Image src={product.thumbnail} alt={product.title} className="object-cover mb-4 rounded-lg" width={350} height={350} />
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-lg font-bold text-blue-600">${product.price}</p>

          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;

import type { Cart } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import { fetchCarts } from '../api/api';




const Carts = async () => {
  const carts: Cart[] = await fetchCarts();


  return (
    <div className="p-4">
      <Link href="../" className="text-blue-500 hover:underline ">
        Back to List
      </Link>

      <h1 className="text-2xl font-bold mb-4">Select a Cart:</h1>
      <ul>
        {carts.map((cart) => (
          <li key={cart.id} className="mb-4 ">
            <Link href={`${cart.id}/`} className="flex flex-col md:flex-row lg:flex-row md:justify-between  bg-gray-100 hover:bg-gray-200 rounded-lg p-4">
              <div className="mt-2 pr-5 text-nowrap">
                <p className="text-center mb-3">Cart {cart.id}</p>
              </div>
              <div className="mt-2 pr-5 text-nowrap">

                <p className="text-gray-600 mb-2">Total: ${cart.total}</p>
                <p className="text-gray-600 mb-2">Discounted Total: ${cart.discountedTotal}</p>
                <p className="text-gray-600 mb-2">Total Products: {cart.totalProducts}</p>
                <p className="text-gray-600 mb-2">Total Quantity: {cart.totalQuantity}</p>
                <p className="text-gray-600">User ID: {cart.userId}</p>
              </div>
              <div className="mt-2 mr-10 max-sm:mt-7 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-16">
                {cart.products.slice(0, 3).map((product) => ( // Show up to 3 products
                  <div className="flex flex-col  items-centers w-20">
                    <Image
                      key={product.id}
                      src={product.thumbnail}
                      alt={product.title}
                      className="rounded-lg shadow-md object-cover"
                      width={100} height={100}

                    />
                    <p className="text-center truncate text-sm mt-2 w-24">{product.title}</p>
                  </div>

                ))}
              </div>


            </Link>


          </li>
        ))}
      </ul>
    </div>
  );
};

export default Carts;

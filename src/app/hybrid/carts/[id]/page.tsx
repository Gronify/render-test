"use client";

import type { Cart } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { fetchCart } from "../../api/api";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const Cart = ({ params }: ProductPageProps) => {
  const [cart, setCart] = useState<Cart>({
    id: 0,
    products: [],
    total: 0,
    discountedTotal: 0,
    userId: 0,
    totalProducts: 0,
    totalQuantity: 0,
  });

  useEffect(() => {
    fetchCart(params.id).then((res) => {
      setCart(res);
    });
  }, [params.id]);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <Link href="../" className="text-blue-500 hover:underline">
        Back to Carts
      </Link>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Cart {cart.id}</h1>
        <div>
          <p className="text-gray-600 mb-2">Total: ${cart.total}</p>
          <p className="text-gray-600 mb-2">
            Discounted Total: ${cart.discountedTotal}
          </p>
          <p className="text-gray-600 mb-2">
            Total Products: {cart.totalProducts}
          </p>
          <p className="text-gray-600 mb-2">
            Total Quantity: {cart.totalQuantity}
          </p>
          <p className="text-gray-600">User ID: {cart.userId}</p>
        </div>
        <h2 className="text-xl font-bold mb-2">Products:</h2>
        <ul>
          {cart.products.map((product) => (
            <li
              key={product.id}
              className="mb-4 p-4 bg-gray-100 rounded-lg grid grid-cols-2"
            >
              <div className="flex justify-center items-center">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  className="mt-2"
                  width={200}
                  height={200}
                />
              </div>
              <div>
                <div className="font-bold">{product.title}</div>
                <div>Price: ${product.price}</div>
                <div>Quantity: {product.quantity}</div>
                <div>Total: ${product.total}</div>
                <div>Discount Percentage: {product.discountPercentage}%</div>
                <div>Discounted Total: ${product.discountedTotal}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Cart), { ssr: false });

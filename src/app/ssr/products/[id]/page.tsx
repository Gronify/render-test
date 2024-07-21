import type { Product, Review } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import { fetchProduct } from '../../api/api';


interface ProductPageProps {
  params: {
    id: string;
  };
}


const Product = async ({ params }: ProductPageProps) => {
  const product: Product = await fetchProduct(params.id);
  // console.log(product)
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className='flex'>
          <div className="relative w-1/2 rounded-lg overflow-hidden">
            <Image
              src={product.thumbnail}
              alt={product.title}
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
          <div className="w-1/2 ml-4">
            <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
            <p className="text-lg mb-4">{product.description}</p>
            <p className="text-2xl font-bold mb-4">${product.price}</p>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Details:</h3>
          <ul className="list-disc pl-6">
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>SKU: {product.sku}</li>
            <li>Weight: {product.weight}g</li>
            <li>Dimensions: {product.dimensions.width}x{product.dimensions.height}x{product.dimensions.depth} mm</li>
            <li>Warranty: {product.warrantyInformation}</li>
            <li>Shipping: {product.shippingInformation}</li>
            <li>Availability: {product.availabilityStatus}</li>
            <li>Return Policy: {product.returnPolicy}</li>
            <li>Minimum Order Quantity: {product.minimumOrderQuantity}</li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Reviews:</h3>
          <div className="space-y-4">
            {product.reviews.map((review: Review) => (
              <div key={review.reviewerEmail} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-2">
                  <div className="flex-shrink-0 mr-3">
                    <Image
                      src={`https://dummyjson.com/icon/${review.reviewerEmail}/50/?type=png`}
                      alt={review.reviewerName}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{review.reviewerName}</p>
                    <p className="text-sm text-gray-600">{new Date(review.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{review.comment}</p>
                <p className="text-yellow-500">Rating: {review.rating} / 5</p>
              </div>
            ))}
          </div>
        </div>
        <Link href="../" className="text-blue-500 hover:underline">
          Back to Products
        </Link>
      </div>
    </div>
  );
}

export default Product;
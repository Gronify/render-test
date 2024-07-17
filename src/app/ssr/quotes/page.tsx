import type { Product, Quote } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';


async function fetchQuotes(): Promise<Quote[]> {
  const response = await fetch("https://dummyjson.com/quotes", {
    cache: "no-store",
  });

  const data = await response.json();
  return data.quotes;
}

const Quotes = async () => {
  const quotes: Quote[] = await fetchQuotes();


  return (

    <div className="bg-gray-100 min-h-screen p-4">
      <Link href="../" className="text-blue-500 hover:underline ">
        Back to List
      </Link>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Quotes</h1>
        <ul>
          {quotes.map((quote) => (
            <li key={quote.id} className="p-4 mb-4 bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-shadow duration-200">
              <p className="text-xl font-semibold text-gray-700 ">{quote.quote}</p>
              <p className="text-gray-600 mt-2">- {quote.author}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>

  );
};

export default Quotes;

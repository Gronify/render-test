'use client'

import type { Post } from '@/types/types';
import Link from 'next/link';
import { fetchPosts } from '../api/api';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';


const Posts = () => {

  const [posts, setPosts] = useState<Post[]>([])
  useEffect(() => {
    fetchPosts().then((res) => {
      setPosts(res)
    })
  }, [])

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <Link href="../" className="text-blue-500 hover:underline ">
        Back to List
      </Link>
      <h1 className="text-2xl font-bold mb-4">Select a Post:</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <li key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-shadow duration-200">
            <Link href={`../posts/${post.id}`} className="block p-4">

              <h2 className="text-xl font-bold">{post.title}</h2>
              <p>{post.body.slice(0, 100)}...</p>

            </Link>
            {/* <Link href={`../users/${post.userId}`} className="text-blue-500">
              {post.userId}
            </Link> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Posts), { ssr: false })

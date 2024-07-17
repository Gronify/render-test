import type { Post } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';


async function fetchPosts(): Promise<Post[]> {
  const response = await fetch("https://dummyjson.com/posts", {
    cache: "no-store",
  });

  const data = await response.json();
  return data.posts;
}

const Posts = async () => {
  const posts: Post[] = await fetchPosts();


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

export default Posts;

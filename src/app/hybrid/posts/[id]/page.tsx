import type { Post, User } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import { fetchPost, fetchPosts, fetchUser } from '../../api/api';
import Comments from './Comments';


interface PostPageProps {
  params: {
    id: string;
  };
}

const Post = async ({ params }: PostPageProps) => {
  const post: Post = await fetchPost(params.id);
  const user: User = await fetchUser(post.userId);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <Link href="../" className="text-blue-500 hover:underline">
          Back to Posts
        </Link>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <p>{post.body}</p>
            <div className="mt-4">
              <p><strong>Views:</strong> {post.views}</p>
              <p><strong>Likes:</strong> {post.reactions.likes}</p>
              <p><strong>Dislikes:</strong> {post.reactions.dislikes}</p>
              <p><strong>Tags:</strong> {post.tags.join(', ')}</p>
            </div>
            <Link href={`../../users/${post.userId}`} className="text-blue-500">
              {user.lastName} {user.firstName}
            </Link>
          </div>

          <h2 className="text-xl font-bold mt-6 mb-2">Comments</h2>
          <Comments params={{ id: post.id.toString() }} />
        </div>

      </div>
    </div>
  );
}

export default Post;

export async function generateStaticParams() {
  const posts: Post[] = await fetchPosts();
  return posts.map((post) => {
    return (
      {
        id: post.id.toString(),
      }
    )
  })
}
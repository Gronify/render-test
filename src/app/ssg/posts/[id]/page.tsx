import type { Comment, Post, User } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { fetchComments, fetchPost, fetchPosts, fetchUser } from "../../api/api";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: {
    id: string;
  };
}

const Post = async ({ params }: PostPageProps) => {
  const post: Post = await fetchPost(params.id);
  const comments: Comment[] = await fetchComments(params.id);
  const user: User = await fetchUser(post.userId);

  if (!comments) {
    console.log(params.id);
    notFound();
  }
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
              <p>
                <strong>Views:</strong> {post.views}
              </p>
              <p>
                <strong>Likes:</strong> {post.reactions.likes}
              </p>
              <p>
                <strong>Dislikes:</strong> {post.reactions.dislikes}
              </p>
              <p>
                <strong>Tags:</strong> {post.tags.join(", ")}
              </p>
            </div>
            <Link href={`../../users/${post.userId}`} className="text-blue-500">
              {user.lastName} {user.firstName}
            </Link>
          </div>

          <h2 className="text-xl font-bold mt-6 mb-2">Comments</h2>
          <div className="bg-white rounded-lg shadow-md p-4">
            <ul>
              {comments.map((comment) => (
                <li key={comment.id} className="mb-4 border-b pb-2 ">
                  <div className="flex">
                    <Image
                      src={comment.user.image}
                      alt={`${user.firstName} ${user.lastName}`}
                      height={128}
                      width={128}
                      className="w-14 h-14 object-cover rounded-full mb-4"
                    />
                    <p>{comment.body}</p>
                  </div>
                  <Link
                    href={`../../users/${comment.user.id}`}
                    className="text-blue-500 flex justify-end"
                  >
                    {comment.user.firstName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

export async function generateStaticParams() {
  const posts: Post[] = await fetchPosts();

  if (!posts || !Array.isArray(posts)) {
    throw new Error("fetchPosts returned invalid data");
  }

  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

"use client";

import type { Comment } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { fetchComments } from "../../api/api";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

interface CommentsPageProps {
  params: {
    id: string;
  };
}

const Comments = ({ params }: CommentsPageProps) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetchComments(params.id).then((res) => {
      setComments(res);
    });
  }, [params.id]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <ul>
        {comments.map((comment) => (
          <li key={comment.id} className="mb-4 border-b pb-2 ">
            <div className="flex">
              <Image
                src={comment.user.image}
                alt={`${comment.user.firstName} ${comment.user.lastName}`}
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
  );
};

export default dynamic(() => Promise.resolve(Comments), { ssr: false });

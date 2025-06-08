'use client'

import type { Comment, Post, User } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import { fetchComments, fetchPost, fetchUser } from '../../api/api';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';


interface PostPageProps {
  params: {
    id: string;
  };
}

const Post = ({ params }: PostPageProps) => {

  const [post, setPost] = useState<Post>({
    id: 0,
    title: '',
    body: '',
    tags: [],
    reactions: {
      likes: 0,
      dislikes: 0,
    },
    views: 0,
    userId: 0,
  })

  const [comments, setComments] = useState<Comment[]>([])

  const [user, setUser] = useState<User>({
    id: 0,
    firstName: '',
    lastName: '',
    maidenName: '',
    age: 0,
    gender: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    birthDate: '',
    image: '',
    bloodGroup: '',
    height: 0,
    weight: 0,
    eyeColor: '',
    hair: {
      color: '',
      type: '',
    },
    ip: '',
    address: {
      address: '',
      city: '',
      state: '',
      stateCode: '',
      postalCode: '',
      coordinates: {
        lat: 0,
        lng: 0,
      },
      country: '',
    },
    macAddress: '',
    university: '',
    bank: {
      cardExpire: '',
      cardNumber: '',
      cardType: '',
      currency: '',
      iban: '',
    },
    company: {
      department: '',
      name: '',
      title: '',
      address: {
        address: '',
        city: '',
        state: '',
        stateCode: '',
        postalCode: '',
        coordinates: {
          lat: 0,
          lng: 0,
        },
        country: '',
      },
    },
    ein: '',
    ssn: '',
    userAgent: '',
    crypto: {
      coin: '',
      wallet: '',
      network: '',
    },
    role: '',
  })
  useEffect(() => {
    fetchPost(params.id).then((res) => {
      setPost(res)
    })
    fetchComments(params.id).then((res) => {
      setComments(res)
    })



  }, [params.id])
  useEffect(() => {
    fetchUser(post.userId).then((res) => {
      setUser(res)
    })
  }, [post])

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
          <div className="bg-white rounded-lg shadow-md p-4">
            <ul>
              {comments.map((comment) => (
                <li key={comment.id} className="mb-4 border-b pb-2 ">
                  <div className="flex">

                    <Image src={comment.user.image} alt={`${user.firstName} ${user.lastName}`} height={128} width={128} className="w-14 h-14 object-cover rounded-full mb-4" />
                    <p>{comment.body}</p>
                  </div>
                  <Link href={`../../users/${comment.user.id}`} className="text-blue-500 flex justify-end">
                    {comment.user.firstName}
                  </Link>
                </li>)
              )}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Post), { ssr: false })
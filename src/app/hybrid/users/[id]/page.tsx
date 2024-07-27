import type { User } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import { fetchUser, fetchUsers } from '../../api/api';


interface UserPageProps {
  params: {
    id: string;
  };
}


const UserPage = async ({ params }: UserPageProps) => {
  const user: User = await fetchUser(params.id);


  return (
    <div className="p-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">

        <h1 className="text-2xl font-bold mb-4">{user.firstName} {user.lastName}</h1>
        <Image src={user.image} alt={`${user.firstName} ${user.lastName}`} height={128} width={128} className="w-32 h-32 object-cover rounded-full mb-4" />
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Birth Date:</strong> {user.birthDate}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Blood Group:</strong> {user.bloodGroup}</p>
          <p><strong>Height:</strong> {user.height} cm</p>
          <p><strong>Weight:</strong> {user.weight} kg</p>
          <p><strong>Eye Color:</strong> {user.eyeColor}</p>
          <p><strong>Hair Color:</strong> {user.hair.color}</p>
          <p><strong>Hair Type:</strong> {user.hair.type}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-xl font-bold mb-2">Address</h2>
          <p>{user.address.address}, {user.address.city}, {user.address.state}, {user.address.country}, {user.address.postalCode}</p>
          <p><strong>Coordinates:</strong> {user.address.coordinates.lat}, {user.address.coordinates.lng}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-xl font-bold mb-2">Company</h2>
          <p><strong>Name:</strong> {user.company.name}</p>
          <p><strong>Title:</strong> {user.company.title}</p>
          <p><strong>Department:</strong> {user.company.department}</p>
          <p>{user.company.address.address}, {user.company.address.city}, {user.company.address.state}, {user.company.address.country}, {user.company.address.postalCode}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-xl font-bold mb-2">Bank</h2>
          <p><strong>Card Number:</strong> {user.bank.cardNumber}</p>
          <p><strong>Card Type:</strong> {user.bank.cardType}</p>
          <p><strong>Card Expire:</strong> {user.bank.cardExpire}</p>
          <p><strong>Currency:</strong> {user.bank.currency}</p>
          <p><strong>IBAN:</strong> {user.bank.iban}</p>
        </div>
      </div>
    </div>
  );
};

export default UserPage;

export async function generateStaticParams() {
  const users: User[] = await fetchUsers();
  return users.map((user) => {
    return (
      {
        id: user.id.toString(),
      }
    )
  })
}
import { useQuery } from "@tanstack/react-query";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
};
const Loading = () => <p>Loading...</p>;
const Error = () => <p>Error...</p>;

export const useUserProfile = (userId: number) => {
  return useQuery({
    queryFn: (): Promise<User> =>
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(
        (res) => res.json()
      ),
    queryKey: ["user", userId],
  });
};

const UserProfile = ({ userId }: { userId: number }) => {
  const { data, error, isLoading } = useUserProfile(userId);

  if (isLoading) return <Loading />;
  if (error) return <Error />;
  return (
    <>
      <h1>{data?.name}</h1>
      <p>Username: {data?.username}</p>
      <p>Email: {data?.email}</p>
      <p>Phone: {data?.phone}</p>
      <p>Website: {data?.website}</p>
    </>
  );
};

export default UserProfile;

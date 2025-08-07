import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function UserInfo() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  console.log(user);

  return (
    <div className="mx-auto mt-10 flex max-w-xl items-center gap-4 rounded-lg border border-blue-300 bg-blue-50 p-6 shadow-md">
      <div>
        <h3 className="text-xl font-semibold text-blue-700">
          {user?.given_name}
        </h3>
        <p className="text-gray-700">Email: {user?.email}</p>
      </div>
    </div>
  );
}

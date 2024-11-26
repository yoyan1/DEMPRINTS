// pages/profile.js
import { useSession } from "next-auth/react";

const Profile = () => {
  const { data: session } = useSession();

  if (!session) {
    return <div>You must be signed in to view this page.</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <p>Email: {session.user.email}</p>
      <p>Role: {session.user.role}</p>
    </div>
  );
};

export default Profile;

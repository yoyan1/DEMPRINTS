// import React from 'react';
// import Heading from './head/heading';
// import Sidebar from './head/aside';

// import { Image } from '@nextui-org/image';

// export default function Layout({ children }) {
//   return (
//     <>
//       <Sidebar />
//       <div class=" sm:ml-64">
//         <Heading />
//       </div>
//       <div class="p-4 sm:ml-64">
//         <div class="p-4 ">{children}</div>
//       </div>
//     </>
//   );
// }

'use client';
import React, { useEffect, useState } from 'react';
// import Header from "../_sections/header";
// import Header from "../admin/_sections/header";
import Heading from './head/heading';
import { SidebarInset, SidebarProvider } from '@/app/components/ui/sidebar';
import { useRouter } from 'next/navigation';
import { Spinner } from '@nextui-org/react';
import { decodeToken } from '@/app/utils/decodeToken';
import { useUserStore } from '@/app/stores/userStore';
import { AppSidebar } from '../components/Staffapp_sidebar';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const { refreshToken } = useUserStore();

  useEffect(() => {
    setLoading(true);
    const loadUser = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        const decode = await decodeToken(token);
        const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/users/images/${decode.image_id}`;
        setUser({ ...decode, imageUrl: imageUrl });

        if (user) {
          // const currentTime = Math.floor(Date.now() / 1000);
          // if (decode.exp < currentTime) {
          //   localStorage.removeItem("token");
          //   router.replace("/");
          //   return;
          // }

          if (!['staff'].includes(decode.role)) {
            router.replace('/');
            localStorage.removeItem('token');
          }

          // const newToken = await refreshToken(token)
          // if(!newToken.err){
          //   localStorage.setItem("token", newToken.token)
          // } else{
          //   console.log(newToken.message)
          //   router.replace('/')
          // }
        }
        setLoading(false);
      } else {
        router.replace('/');
      }
    };

    loadUser();
  }, [router]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <div className="dark:bg-gray-800 bg-slate-200 h-full">
          <Heading />
          <div className='m-1'>
            {/* Passing user to children if needed */}
            {React.cloneElement(children, { user })}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

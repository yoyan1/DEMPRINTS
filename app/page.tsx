import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Link href="/master" className="w-36 text-center rounded-sm py-1 bg-primary text-white">Master</Link>
        <Link href="/admin" className="w-36 text-center rounded-sm py-1 bg-primary text-white">Admin</Link>
        <Link href="/staff/transactions" className="w-36 text-center rounded-sm py-1 bg-primary text-white">Staff</Link>
        <Link href="/login" className="w-36 text-center rounded-sm py-1 bg-primary text-white">Log in</Link>
      </main>
    </div>
  );
}

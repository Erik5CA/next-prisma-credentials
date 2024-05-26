import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";

async function Navbar() {
  const session = await getServerSession(authOptions);
  return (
    <nav className="flex justify-between items-center bg-zinc-900 py-10 px-24">
      <h1 className="text-4xl font-bold">Next Auth</h1>
      <ul className="flex justify-center items-center gap-4">
        {session?.user ? (
          <>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/auth/logout">Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/auth/login">Login</Link>
            </li>
            <li>
              <Link href="/auth/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

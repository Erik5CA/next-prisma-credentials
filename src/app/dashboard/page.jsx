"use client";
import { signOut } from "next-auth/react";

function DashboardPage() {
  return (
    <div className="flex h-screen  justify-center items-scenter">
      <div>
        <h1>DashboardPage</h1>
        <button
          onClick={() => signOut()}
          className="bg-white text-black px-4 py-2 rounded-md mt-4"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default DashboardPage;

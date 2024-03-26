"use client";

import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  function handleSignIn() {
    gitHubSignIn();
  }

  function handleSignOut() {
    firebaseSignOut();
  }

  console.log(user);

  return (
    <main>
      <h1 className="text-3xl font-bold m-2">Shopping List</h1>
      <div className="flex">
        <div className="flex-1 max-w-sm m-2">
          {!user && (
            <button
              onClick={handleSignIn}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign In with GitHub
            </button>
          )}
          {user && (
            <div>
              <p>
                Welcome, {user.displayName} ({user.email}), you are now signed
                in!
              </p>
              <button
                onClick={handleSignOut}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Sign Out
              </button>
              <br />
              <Link href="/week-10/shopping-list">
                Continue to your Shopping List
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

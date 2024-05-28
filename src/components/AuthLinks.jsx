"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const AuthLinks = ({ linkStyles }) => {
  const { status } = useSession();

  return (
    <>
      {status === "unauthenticated" ? (
        <Link href="/login" className={`capitalize font-sans ${linkStyles}`}>
          Login
        </Link>
      ) : (
        <>
          <Link href="/write" className={`capitalize font-sans ${linkStyles}`}>
            Write
          </Link>
          <span
            className={`capitalize cursor-pointer font-sans ${linkStyles}`}
            onClick={() => signOut()}
          >
            Logout
          </span>
        </>
      )}
    </>
  );
};

export default AuthLinks;

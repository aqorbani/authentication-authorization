import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      });
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <button>
          <Link href="/dashboard">dashboard</Link>
        </button>
      ) : (
        <>
          <button>
            <Link href="/signup">Sign Up</Link>
          </button>
          <button>
            <Link href="/signin">Sign In</Link>
          </button>
        </>
      )}
    </>
  );
}

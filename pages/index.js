import Link from "next/link";

export default function Home() {
  return (
    <>
      <button>
        <Link href="/signup">Sign Up</Link>
      </button>
      <button>
        <Link href="/signin">Sign In</Link>
      </button>
      <button>
        <Link href="/dashboard">dashboard</Link>
      </button>
    </>
  );
}

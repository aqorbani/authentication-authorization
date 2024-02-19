import { useRouter } from "next/router";
import { verifyToken } from "@/utils/auth";
import { useState } from "react";

export default function Dashboard() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const signOutHandler = async () => {
    const res = await fetch("/api/auth/signout");
    const data = await res.json();
    console.log(data);
    router.push("/");
  };

  return (
    <div>
      <h3>dashboard</h3>
      <button onClick={signOutHandler}>Sign out</button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { token } = context.req.cookies;
  const secretKey = process.env.SECRET_KEY;

  const result = verifyToken(token, secretKey);

  if (!result) {
    return { redirect: { destination: "/signin", permanent: false } };
  }

  return { props: { result } };
}

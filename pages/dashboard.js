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

  const editHandler = async () => {
    const res = await fetch("/api/update", {
      method: "POST",
      body: JSON.stringify({ name, lastName, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <h3>dashboard</h3>
      <button onClick={signOutHandler}>Sign out</button>
      <hr />
      <hr />
      <hr />
      <h3>update</h3>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="name"
      />
      <input
        type="text"
        name="name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="lastName"
      />
      <input
        type="text"
        name="name"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <button onClick={editHandler}>edit</button>
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

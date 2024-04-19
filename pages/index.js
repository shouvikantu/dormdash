import Image from "next/image";
import { Inter } from "next/font/google";
import Signup from "@/components/SignUp";
import Login from "@/components/Login";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Login />
    </div>
  );
}

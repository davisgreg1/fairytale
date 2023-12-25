"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { signIn, useSession, signOut } from "next-auth/react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { motion } from "framer-motion";

export default function SignIn() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/storyDetails");
    }
  });

  const handleOnSignIn = (method: string) => {
    signIn(method);
  };

  const handleOnSignOut = () => {
    signOut();
    router.push("/");
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="bg-gradient-to-r from-green-400 to-blue-500 h-screen flex flex-col items-center justify-center p-4 text-center">
      <motion.div variants={fadeInUp} className="w-80 h-80 relative mb-8">
        <Image
          src="/images/fairyTaleLogo.png"
          alt="Fairy Tale Logo"
          layout="fill"
        />
      </motion.div>

      <motion.h1 variants={fadeInUp} className="text-3xl font-bold text-white">
        Create a <span className="text-pink-300">fairy tale</span> using your
        child&apos;s <span className="text-yellow-300">imagination!</span>
      </motion.h1>

      <motion.p variants={fadeInUp} className="mt-8 text-xl text-white">
        Enjoy bonding with your child by creating their personalized bedtime
        fairy tale complete with illustrations.
        <br />
        <span className="text-pink-300">The first three are free!</span>
      </motion.p>

      <motion.button
        variants={fadeInUp}
        onClick={() => handleOnSignIn("google")}
        className="bg-pink-500 hover:bg-pink-600 mt-8 py-3 px-6 rounded text-white font-bold flex items-center w-auto">
        <AiFillGoogleCircle className="mr-2" />
        Sign in with Google
      </motion.button>
    </motion.div>
  );
}

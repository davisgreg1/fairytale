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
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="h-screen flex flex-col items-center justify-start p-4 text-center bg-gradient-to-r from-green-200 via-blue-100 to-purple-200"
    >
      <motion.div className="w-80 h-80 relative" variants={fadeInUp}>
        <Image src="/images/fairyTaleLogo.png" alt="the fairy tale logo" layout="fill" />
      </motion.div>
      <motion.div variants={fadeInUp} className="text-2xl mt-8">
        <h1>
          Create a <span className="text-4xl text-indigo-600">fairy tale</span> using your child&apos;s <span className="text-4xl text-pink-400">imagination!</span>
        </h1>
      </motion.div>
      <motion.div variants={fadeInUp} className="text-2xl mt-16">
        <h2>
          <span className="text-4xl text-indigo-600">Enjoy bonding</span> with your child by creating their personalized bedtime fairy tale complete with illustrations. 
          <br /> 
          <span className="text-4xl text-pink-400 mt-2 block">The first three are free!</span>
        </h2>
      </motion.div>
      <motion.div variants={fadeInUp} className="mt-16">
        <button
          onClick={() => handleOnSignIn("google")}
          type="button"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          <AiFillGoogleCircle size={"2rem"} className="mr-4" />
          Sign in with Google Account
        </button>
      </motion.div>
    </motion.div>
  );
}

// import { useEffect } from "react";
// import Image from "next/image";
// import { useRouter, usePathname, useSearchParams } from "next/navigation";

// import { signIn, useSession, signOut } from "next-auth/react";
// import { AiFillGoogleCircle } from "react-icons/ai";
// /**
//  *
//  * @returns https://dribbble.com/shots/16257444-Mind-Palace-App-Mobile-Auth-Onboarding
//  */
// export default function SignIn() {
//   const { status, data: session } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "authenticated") {
//       router.push("/storyDetails");
//     }
//   });

//   const handleOnSignIn = (method: string) => {
//     signIn(method);
//   };

//   const handleOnSignOut = () => {
//     signOut();
//     router.push("/");
//   };

//   return (
//     <div className="h-screen justify-start items-center flex flex-col p-4 text-center">
//       <div className="w-80 h-80 relative">
//         <Image
//           src="/images/fairyTaleLogo.png"
//           alt="the fairy tale logo"
//           fill={true}
//         />
//       </div>
//       <div>
//         <h1 className="text-2xl">
//           Create a <span className="text-4xl text-blue-900">fairy tale</span>{" "}
//           using your child&apos;s{" "}
//           <span className="text-4xl text-yellow-400">imagination!</span>
//         </h1>
//       </div>
//       <div className="pt-16 text-2xl">
//         <h2>
//           <span className="text-4xl text-blue-900">Enjoy bonding</span> with
//           your child by creating their personalized bedtime fairy tale complete
//           with illustrations <br />{" "}
//           <div className="text-4xl text-yellow-400 pt-2">
//             The first three are free!
//           </div>
//         </h2>
//       </div>
//       <div className="pt-16">
//         <button
//           onClick={() => handleOnSignIn("google")}
//           type="button"
//           className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
//           <span className="pr-4">
//             <AiFillGoogleCircle size={"2rem"} />
//           </span>
//           <span>with Google Account</span>
//         </button>
//       </div>
//     </div>
//   );
// }

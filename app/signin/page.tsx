"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { signIn, useSession, signOut } from "next-auth/react";
import { AiFillGoogleCircle } from "react-icons/ai";
/**
 *
 * @returns https://dribbble.com/shots/16257444-Mind-Palace-App-Mobile-Auth-Onboarding
 */
export default function SignIn() {
  const { status, data: session } = useSession();
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

  return (
    <div className="h-screen justify-start items-center flex flex-col p-4 text-center">
      <div className="w-80 h-80 relative">
        <Image
          src="/images/fairyTaleLogo.png"
          alt="the fairy tale logo"
          fill={true}
        />
      </div>
      <div>
        <h1 className="text-2xl">
          Create a <span className="text-4xl text-blue-900">fairy tale</span>{" "}
          using your child&apos;s{" "}
          <span className="text-4xl text-yellow-400">imagination!</span>
        </h1>
      </div>
      <div className="pt-16 text-2xl">
        <h2>
          <span className="text-4xl text-blue-900">Enjoy bonding</span> with
          your child by creating their personalized bedtime fairy tale complete
          with illustrations <br />{" "}
          <div className="text-4xl text-yellow-400 pt-2">
            The first three are free!
          </div>
        </h2>
      </div>
      <div className="pt-16">
        <button
          onClick={() => handleOnSignIn("google")}
          type="button"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
          <span className="pr-4">
            <AiFillGoogleCircle size={"2rem"} />
          </span>
          <span>with Google Account</span>
        </button>
      </div>
    </div>
  );
}

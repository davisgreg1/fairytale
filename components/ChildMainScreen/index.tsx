"use client";
import { signIn, useSession, signOut } from "next-auth/react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { localStorage } from "@/utils/localStorage";
import { motion } from "framer-motion";

interface ChildMainScreenProps {
  onContinue: () => void;
}
const ChildMainScreen = (props: ChildMainScreenProps) => {
  const { status, data: session } = useSession();

  const sessionAvailable = status === "authenticated";
  const { onContinue } = props;

  const handleOnClick = (method: string) => signIn(method);
  const handleSignOut = () => {
    localStorage.clear()
    signOut();
  };

  return (
    <motion.div
      key="screen-one"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}>
      <div className="relative flex flex-col justify-between h-screen m-auto">
        <div>
          {sessionAvailable && (
            <button onClick={handleSignOut}>Sign out</button>
          )}
        </div>
        <div className={`m-auto`}>Main Screen Here</div>
        <div className="flex justify-center pb-4">
          {" "}
          {sessionAvailable ? (
            <button
              className="p-2 text-white bg-blue-500 rounded hover:bg-blue-700"
              onClick={onContinue}>
              Continue
            </button>
          ) : (
            <div>
              <button
                className={`p-2 text-white bg-red-500 rounded hover:bg-red-700 flex items-center justify-center`}
                title="sign in with Google"
                onClick={() => handleOnClick("google")}>
                Sign in with: <AiFillGoogleCircle size={"2rem"} />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChildMainScreen;

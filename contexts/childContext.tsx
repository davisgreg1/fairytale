"use client";
import React, { createContext, useState } from "react";

type ChildContextType = {
  children: React.ReactNode;
};

type ChildContextProviderType = {
  name: string;
  setName: (name: string) => void;
  gender: string;
  setGender: (gender: string) => void;
  age: number | string;
  setAge: (age: number) => void;
  story: string;
  setStory: (story: string) => void;
};

export const ChildContext = createContext<ChildContextProviderType>(
  {} as ChildContextProviderType,
);

export default function ChildContextProvider({ children }: ChildContextType) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(1);
  const [story, setStory] = useState("");

  return (
    <ChildContext.Provider
      value={{
        name,
        setName,
        gender,
        setGender,
        age,
        setAge,
        story,
        setStory,
      }}>
      {children}
    </ChildContext.Provider>
  );
}

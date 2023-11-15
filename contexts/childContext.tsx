"use client";
import React, { createContext, useState } from "react";
import { localStorage } from '@/utils/localStorage';

type ChildContextType = {
  children: React.ReactNode;
};

type ChildContextProviderType = {
  name: string;
  setName: (name: string) => void;
  gender: "Boy" | "Girl" | "Neutral";
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
  const savedName = localStorage.getItem("childName") ?? "";
  const savedGender = localStorage.getItem("childGender") ?? "";
  const savedAge = localStorage.getItem("childAge") ?? 1;
  const savedStory = localStorage.getItem("childStory") ?? "";

  const [name, setName] = useState(savedName);
  const [gender, setGender] = useState(savedGender);
  const [age, setAge] = useState(savedAge);
  const [story, setStory] = useState(savedStory);

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

"use client";

import dynamic from "next/dynamic";

const Typewriter = dynamic(() => import("typewriter-effect"), {
  ssr: false,
});

export default function Title() {
  return (
    <h1 className="text-center text-3xl font-bold text-primary-500 h-[36px] text-black">
      <Typewriter
        onInit={(typewriter) => {
          typewriter.typeString("Welcome to Safenook").start();
        }}
        options={{
          delay: 85,
        }}
      />
    </h1>
  );
}

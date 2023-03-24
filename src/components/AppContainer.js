import React from "react";

export default function AppContainer({ children }) {
  return (
    <div className="bg-gradient-to-b from-neutral-200 to-zinc-50 dark:from-neutral-700 dark:to-zinc-500 pb-10">
      {children}
    </div>
  );
}

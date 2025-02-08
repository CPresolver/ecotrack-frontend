import React from "react";

export default function FormLayout({ children }) {
  return (
    <div className="flex justify-center mt-40">
      <div className="w-1/3 p-8 shadow-md">{children}</div>
    </div>
  );
};


import React from "react";

export default function Form() {
    const variants = ['underlines'];
  return (
    <>
      <div className="w-full flex flex-col gap-4">
        {variants.map((variant) => (
          <div
            key={variant}
            className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
          >
            <Input type="email" variant={variant} label="Email" />
            <Input
              type="email"
              variant={variant}
              label="Email"
              placeholder="Enter your email"
            />
          </div>
        ))}
      </div>
    </>
  );
}

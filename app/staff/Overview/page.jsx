"use client";

import React from "react";
import { BsFillPeopleFill } from "react-icons/bs";

export default function Overview() {
  return (
    <>
      <main className="bg-white">
        <div className="flex gab-4">
          <div class="">
            <BsFillPeopleFill className="flex-shrink-0 w-6 h-6 text-lg "/>

            <a href="#">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Need a help in Claim?
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Go to this step by step guideline process on how to certify for
              your weekly benefits:
            </p>
          </div>{" "}
          <div className="">
            <BsFillPeopleFill className="flex-shrink-0 w-6 h-6 text-lg "  />

            <a href="#">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Need a help in Claim?
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Go to this step by step guideline process on how to certify for
              your weekly benefits:
            </p>
          </div>
          <div className="">
            <BsFillPeopleFill className="flex-shrink-0 w-6 h-6 text-lg "  />

            <a href="#">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Need a help in Claim?
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Go to this step by step guideline process on how to certify for
              your weekly benefits:
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

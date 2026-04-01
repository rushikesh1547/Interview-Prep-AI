import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse space-y-6 max-w-3xl mt-6">

      {/* Header */}
      <div className="h-6 bg-gray-300 rounded w-1/3 dark:bg-gray-700"></div>

      {/* Card 1 */}
      <div className="space-y-3">
        <div className="h-4 bg-gray-300 rounded w-full dark:bg-gray-700"></div>
        <div className="h-4 bg-gray-300 rounded w-11/12 dark:bg-gray-700"></div>
        <div className="h-4 bg-gray-300 rounded w-10/12 dark:bg-gray-700"></div>
      </div>

      {/* Card 2 */}
      <div className="space-y-3">
        <div className="h-4 bg-gray-300 rounded w-full dark:bg-gray-700"></div>
        <div className="h-4 bg-gray-300 rounded w-11/12 dark:bg-gray-700"></div>
        <div className="h-4 bg-gray-300 rounded w-9/12 dark:bg-gray-700"></div>
      </div>

      {/* Card 3 */}
      <div className="space-y-3">
        <div className="h-4 bg-gray-300 rounded w-full dark:bg-gray-700"></div>
        <div className="h-4 bg-gray-300 rounded w-10/12 dark:bg-gray-700"></div>
        <div className="h-4 bg-gray-300 rounded w-8/12 dark:bg-gray-700"></div>
      </div>

      {/* Footer block */}
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg space-y-3">
        <div className="h-3 bg-gray-300 rounded w-3/4 dark:bg-gray-700"></div>
        <div className="h-3 bg-gray-300 rounded w-2/3 dark:bg-gray-700"></div>
      </div>

    </div>
  );
};

export default SkeletonLoader;
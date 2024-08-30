import React from 'react';

function AllBlogsSkeleton({ mode }) {

  return (

    <div
      className={`animate-pulse ${
        mode === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } rounded-lg overflow-hidden shadow-lg my-4`} >

      {/* Thumbnail Skeleton */}
      <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 mb-4"></div>

      <div className="p-6">

        {/* Date Skeleton */}
        <div className="h-4 bg-gray-300 dark:bg-gray-700 mb-2.5 w-1/4"></div>

        {/* Title Skeleton */}
        <div className="h-6 bg-gray-300 dark:bg-gray-700 mb-4 w-3/4"></div>

        {/* Content Skeleton */}
        <div className="h-4 bg-gray-300 dark:bg-gray-700 mb-2.5 w-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 mb-2.5 w-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 mb-2.5 w-full"></div>

      </div>
    </div>

  );
}

export default AllBlogsSkeleton;

"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ActivityAdminSkeleton() {
  return (
    <div className="bg-secondary rounded-lg border border-gray-400 p-4 flex justify-between shadow-lg">
      <div className="flex">
        <div className="mr-4 flex-shrink-0">
          <Skeleton height={96} width={128} borderRadius={8} />
        </div>
        <div className="flex flex-col justify-center space-y-2">
          <Skeleton height={20} width={200} />
          <Skeleton height={14} width={120} />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Skeleton circle width={40} height={40} />
        <Skeleton circle width={40} height={40} />
        <Skeleton circle width={40} height={40} />
      </div>
    </div>
  );
}

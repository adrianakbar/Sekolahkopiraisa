import React from 'react';

export default function SkeletonActivity() {
  return (
    <div className="px-4 md:px-8 py-4 max-w-400 mx-auto">
      {/* Skeleton untuk ActivitySlider */}
      <section className="mt-20 md:mt-30">
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] bg-gray-200 animate-pulse rounded-xl overflow-hidden shadow-md">
          {/* Placeholder untuk gambar */}
          <div className="absolute inset-0 bg-gray-300"></div>
          {/* Placeholder untuk dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="w-3 h-3 bg-gray-400 rounded-full animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </section>

      {/* Skeleton untuk ActivityCard */}
      <section className="mt-8">
        <div className="h-6 w-1/4 bg-gray-300 rounded mb-4 animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="w-full animate-pulse">
              <div className="relative h-40 w-full bg-gray-300 rounded-xl overflow-hidden mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
              <div className="h-3 w-1/4 bg-gray-300 rounded mt-1"></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
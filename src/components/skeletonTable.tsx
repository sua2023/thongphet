export default function SkeletonTable() {
  return (
    <>
      <div className="border border-gray300 rounded-md divide-y mb-5 divide-gray300">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="w-full p-5 space-y-4  animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex justify-between gap-10">
                  <div className="lg:w-56 w-12 h-2 bg-gray300 rounded-full "></div>
                  <div className="lg:w-56 w-12 h-2 bg-gray300 rounded-full "></div>
                  <div className="lg:w-56 w-12 bg-gray300 rounded-full "></div>
                  <div className="lg:w-56 w-12 bg-gray300 rounded-full "></div>
                </div>
                <div className="h-2 bg-gray300 rounded-full lg:w-36 w-8"></div>
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          ))}
      </div>
    </>
  );
}

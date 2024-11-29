import Link from "next/link";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-y-10 mt-16 w-full">
      <h2 className="font-semibold [font-size:30px]">Page Not Found</h2>
      <p className="">We cannot find the page that you&apos;re looking for</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}

export default NotFoundPage;

// <div className="w-full mt-16 flex justify-center items-center flex-col gap-y-10">
// <h2 className="text-text font-semibold [font-size:30px]">
//   Oops! Page not found.
// </h2>
// <p className="text-text-secondary text-lg ">
//   We can&apos;t seem to find the page you&apos;re looking for.
// </p>
// <Link
//   href="/"
//   className="p-2 border border-primary border-solid text-primary rounded"
// >
//   Return Home
// </Link>
// </div>

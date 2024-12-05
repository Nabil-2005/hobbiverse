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

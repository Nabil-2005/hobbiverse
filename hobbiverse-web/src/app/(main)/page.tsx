import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <span>This is the homepage.</span>
      <Link href="/music">Go to music page.</Link>
      <Link href="/games">Go to games page.</Link>
      <Link href="/animanga">Go to animanga page.</Link>
    </div>
  );
}

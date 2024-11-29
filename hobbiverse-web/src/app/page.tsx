import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-5 mt-10">
      <h1 className="flex items-center justify-center text-4xl font-bold">
        Welcome to Hobbiverse!
      </h1>
      <div className="flex items-center justify-center">
        <Button>
          <Link href={}>Login to Spotify</Link>
        </Button>
      </div>
    </div>
  );
}

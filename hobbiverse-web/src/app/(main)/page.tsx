import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full items-center">
      <div className="flex flex-col p-10 w-full h-full items-center">
        <div className="my-5">
          <h1 className="text-xl font-bold">WELCOME TO HOBBIVERSE</h1>
        </div>
        <div className="flex flex-row w-full p-6 gap-16 justify-between">
          <div className="w-1/3">
            <Link href="/music">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Go to music page</p>
                </CardContent>
                <CardFooter>
                  <p>Card Footer</p>
                </CardFooter>
              </Card>
            </Link>
          </div>
          <div className="w-1/3">
            <Link href="/games">
              <Card>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Go to games page</p>
                </CardContent>
                <CardFooter>
                  <p>Card Footer</p>
                </CardFooter>
              </Card>
            </Link>
          </div>
          <div className="w-1/3">
            <Link href="/animanga">
              <Card>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Go to animanga page</p>
                </CardContent>
                <CardFooter>
                  <p>Card Footer</p>
                </CardFooter>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

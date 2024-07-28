import getAllPostAction from "@/actions/getAllPostAction";
import Main from "@/components/Main";
import PostFeed from "@/components/PostFeed";
import PostForm from "@/components/PostForm";
import UserInformation from "@/components/UserInformation";
import Widget from "@/components/Widget";
import { SignedIn, SignedOut } from "@clerk/nextjs";



export const revalidate = 0;

export default async function Home() {
  
  const posts = await getAllPostAction();

  
  return (
    <>
    <SignedOut>
      <div className="flex flex-1  items-center justify-center">
        <section className="flex justify-center min-h-screen items-center w-[60%] m-auto">
            <Main />
        </section>
      </div>
      </SignedOut>
      <main className="grid grid-cols-6 mt-5 sm:px-5">
        <section className="hidden md:inline md:col-span-2">
          <UserInformation posts={posts} />
        </section>

        <section className="col-span-full md:col-span-6 xl:col-span-4 xl:max-w-xl mx-auto w-full">
          <SignedIn>
            <PostForm />
          </SignedIn>

          <PostFeed posts={posts} />
        </section>
      </main>
    </>
  );
}



import Link from "next/link";
import { prisma } from "../db";
import { redirect } from "next/navigation";

// with the new nextjs server update this is how you would create functions
async function createToDo(data: FormData) {
    "use server"

    // we are adding the valueof incase it the title returns indefined for an empty submission
    const title = data.get('title')?.valueOf()

    // checking to see if the value of title is a sting and not empty
    if (typeof title !== 'string' || title.length === 0) {
        throw new Error(`Invalid title`);
    }

    // if the title is a proper string we will pass it in the title parameter
    await prisma.todo.create({ data: {title, complete: false } });

    //redirect to the home page
    redirect("/")

}

export default function Page() {
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl">New</h1>
      </header>
      <form action={createToDo} className="flex gap-2 flex-col">
        <input
          type="text"
          name="title"
          className="border border-slate-200 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />
        <div className="flex gap-1 justify-end">
          <Link
            href=".."
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

import Link from "next/link"
import { prisma } from "./db"
import { TodoItem } from "@/components/TodoItem"

// creating a server function for the toogleTodo persistene
async function toggleTodo(id: string, complete : boolean) {
  "use server"

  // we are updating the state of the complete checkbox inside of the database so that if you refresh it will still be updated
  await prisma.todo.update({where: {id}, data: {complete}})
}

export default async function Home() {

  // in nextjs we can get the data from the database directly 
  const todos = await prisma.todo.findMany()
  return (
    // we are adding this <> because we can only have one parent element so we will add everything inside this
    <> 
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-3xl">Todos</h1>
      <Link className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"href="/new">New</Link>

    </header>
    <ul className="p1-4">
      {/* We will loop through all of our todos with the map function  */}
      {todos.map(todo =>(
        <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo}/>
      ))}
    </ul>
    </>
  )
}
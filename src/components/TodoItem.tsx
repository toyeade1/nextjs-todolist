// because we have an event handler we will need to have access to the client and this is currently running on the server so we will use this

"use client"

// creating the todo component so that we can attach it to each todo item in the database

type TodoItemProps = {
  id: string;
  title: string;
  complete: boolean;
  toggleTodo: (id: string, complete: boolean) => void;
};

export function TodoItem({ id, title, complete, toggleTodo }: TodoItemProps) {
  // bacause it is type scripe we are making the properties of the todoitem of type todoprops
  return (
    <li className="flex gap-1 items-center">
      {/* Adding the peer will allow us to put a line-through if the peer is checked it is a way to connect 2 html tags */}
      <input
        id={id}
        type="checkbox"
        className="cursor-pointer peer"
        defaultChecked={complete}
        onChange={e => toggleTodo(id, e.target.checked)}
      />
      <label
        htmlFor={id}
        className=" cursor-pointer peer-checked:line-through peer-checked:text-slate-500"
      >
        {title}
      </label>
    </li>
  );
}

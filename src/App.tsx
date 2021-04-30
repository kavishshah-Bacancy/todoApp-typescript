import React, { Fragment, useState } from "react";
import "./App.css";

interface todoInter {
  text: string;
  done: boolean;
}

function App(): JSX.Element {
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<todoInter[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  };

  const addTodo = (text: string): void => {
    const newTodos: todoInter[] = [...todos, { text, done: false }];
    setTodos(newTodos);
  };

  const doneTodo = (index: number): void => {
    const newTodos: todoInter[] = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  };

  const deleteTodo = (index: number): void => {
    const newTodos: todoInter[] = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const editTodo = (index: number): void => {
    const newTodos: todoInter[] = [...todos];
    const editTodoText = newTodos[index].text;
    console.log(editTodoText);
    setValue(editTodoText);
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  return (
    <div className="card">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
        <button className="addbutton" type="submit">
          Add Todo
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {todos.map((todo: todoInter, index: number) => {
              return (
                <Fragment key={index}>
                  <td>
                    <div
                      style={{
                        textDecoration: todo.done ? "line-through" : "",
                      }}
                    >
                      {todo.text}
                    </div>
                  </td>
                  <td>
                    <button type="button" onClick={(): void => doneTodo(index)}>
                      {todo.done ? "Pending" : "Done"}
                    </button>
                    <button
                      type="button"
                      onClick={(): void => deleteTodo(index)}
                    >
                      Delete
                    </button>
                    <button type="button" onClick={(): void => editTodo(index)}>
                      Edit
                    </button>
                  </td>
                </Fragment>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default App;

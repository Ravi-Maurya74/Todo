import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const inputRef = useRef();
  const initialRender = useRef(true);

  function addItem() {
    setItems([...items, inputRef.current.value]);
    inputRef.current.value = "";
  }
  function deleteItem(index) {
    const newItems = items.filter((item, i) => i !== index);
    setItems(newItems);
  }

  useEffect(() => {
    const storedItems = localStorage.getItem("items");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
      console.log(items);
    }
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      localStorage.setItem("items", JSON.stringify(items));
    }
  }, [items]);

  return (
    <>
      <div className=" flex flex-col justify-between items-start m-8">
        <h1 className=" text-5xl font-bold">To-do list app</h1>
        <h3 className=" text-xl my-2">
          Insert your items below and click Add.
        </h3>
        <div className=" flex my-16 justify-stretch w-full">
          <input
            type="text"
            placeholder="Add item"
            ref={inputRef}
            className="border-2 border-gray-400 rounded-lg w-1/3 mr-4 p-2"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            onClick={() => addItem()}
          >
            Add
          </button>
        </div>
        <div className=" w-full">
          <ul className=" bg-gray-50 rounded-lg w-1/2">
            {items.map((item, index) => (
              <li
                key={index}
                className=" my-2 border-solid border-b-2 border-gray-200 p-2 flex justify-between items-center text-justify"
              >
                {item}{" "}
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg ml-4"
                  onClick={() => deleteItem(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;

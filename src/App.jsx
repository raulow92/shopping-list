import { useState } from "react";
import { nanoid } from "nanoid";
import initialItems from "./items";
import "./App.css";
import { FaSearch, FaListUl } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { BiTrash } from "react-icons/bi";

function App() {
    const [items, setItems] = useState(initialItems);
    const [newItem, setNewItem] = useState("");
    const [search, setSearch] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        if (newItem === "") return;
        setItems([
            ...items,
            {
                id: nanoid(),
                name: newItem,
                completed: false,
            },
        ]);
        setNewItem("");
    };

    const onDelete = (id) => {
        confirm("Are you sure you want to delete this item?") &&
            setItems(items.filter((item) => item.id !== id));
    };

    const onComplete = (id) => {
        setItems(
            items.map((item) => {
                return item.id === id
                    ? { ...item, completed: !item.completed }
                    : item;
            })
        );
    };

    const searcher = (items) => {
        return items.filter((item) =>
            item.name.toLowerCase().includes(search.trim())
        );
    };

    const itemClasses =
        "font-medium cursor-pointer truncate overflow-hidden w-[420px]";

    return (
        <section className="w-[600px] h-screen flex justify-center items-center">
            <div className="bg-neutral-50 rounded-xl shadow-lg border h-[600px] w-full flex flex-col justify-between">
                <div>
                    <div className="flex items-center ml-8">
                        <div className="flex items-center">
                            <FaCartShopping className="text-3xl text-sky-500 mr-2" />
                            <h1 className="text-3xl font-bold whitespace-nowrap text-sky-500">
                                Shopping List
                            </h1>
                        </div>
                        <div className="flex items-center w-full m-8">
                            <FaSearch className="absolute pointer-events-none ml-5 text-neutral-500" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search"
                                className="bg-neutral-50 border-neutral-300 border rounded-lg py-3 px-12 w-full"
                            />
                        </div>
                    </div>
                    <ul className="h-[370px] overflow-y-scroll">
                        {searcher(items).map((item, index) => (
                            <li
                                key={item.id}
                                className="flex justify-between items-center first:border-t border-b border-neutral-300 py-4"
                            >
                                <div className="flex items-center mx-8">
                                    <p className="mr-3 text-xs">{index + 1}</p>
                                    <p
                                        onClick={() => onComplete(item.id)}
                                        className={`${itemClasses} ${
                                            item.completed &&
                                            "line-through text-slate-400"
                                        }`}
                                    >
                                        {item.name}
                                    </p>
                                </div>
                                <button
                                    className="mx-8 text-lg text-neutral-500"
                                    onClick={() => onDelete(item.id)}
                                >
                                    <BiTrash />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <form
                    onSubmit={onSubmit}
                    className="flex items-center w-auto m-8"
                >
                    <FaListUl className="absolute pointer-events-none ml-5 text-neutral-500" />
                    <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        placeholder="Add new item"
                        className="bg-neutral-50 border-neutral-300 border rounded-lg py-3 px-12 w-full mr-3"
                        autoFocus
                    />
                    <button
                        className="bg-sky-500 text-neutral-50 rounded-lg py-3 px-5"
                        type="submit"
                    >
                        Add
                    </button>
                </form>
            </div>
        </section>
    );
}

export default App;

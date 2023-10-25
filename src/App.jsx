import { useState } from "react";
import { nanoid } from "nanoid";
import initialItems from "./items";
import "./App.css";
import { FaSearch, FaListUl } from "react-icons/fa";



function App() {
    const [items, setItems] = useState(initialItems);
    const [newItem, setNewItem] = useState("");
    const [search, setSearch] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
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

    const liClasses = "";

    return (
        <section className="max-w-2xl w-2/3 h-screen py-24">
            <div className="bg-neutral-50 p-8 rounded-xl shadow-lg border h-full flex flex-col justify-between">
                <div>
                    <div className="flex items-center w-full">
                        <FaSearch className="absolute pointer-events-none ml-5 text-neutral-500"/>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search"
                            className="bg-neutral-50 border-neutral-300 border rounded-lg py-3 px-12 w-full"
                        />

                    </div>
                    <div className="overflow-hidden">
                        <ul className="">
                            {searcher(items).map((item, index) => (
                                <li key={item.id} className="flex">
                                    <p>{index + 1}</p>
                                    <p
                                        onClick={() => onComplete(item.id)}
                                        className={`${liClasses} ${
                                            item.completed && "line-through"
                                        }`}
                                    >
                                        {item.name}
                                    </p>
                                    <button onClick={() => onDelete(item.id)}>
                                        X
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <form onSubmit={onSubmit} className="flex items-center w-full">
                    <FaListUl className="absolute pointer-events-none ml-5 text-neutral-500"/>
                    <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        placeholder="Add new item"
                        className="bg-neutral-50 border-neutral-300 border rounded-lg py-3 px-12 w-full mr-2"
                        autoFocus
                    />
                    <button className="bg-blue-500 text-neutral-50 rounded-lg py-3 px-5" type="submit">Add</button>
                </form>
            </div>
        </section>
    );
}

export default App;

import { useState } from "react";
import { nanoid } from "nanoid";
import initialItems from "./items";
import "./App.css";

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
              return item.id === id ? {...item, completed: !item.completed} : item}));
    }

    const searcher = (items) => {
        return items.filter((item) => item.name.toLowerCase().includes(search.trim()));
    };

    const liClasses = ""

    return (
        <div className="max-w-2xl w-2/3 border-slate-900 border">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-slate-900 border"
            />
            <ul>
                {searcher(items).map((item) => (
                    <li 
                      key={item.id} 
                      className={`${liClasses} ${item.completed && "line-through"}`}
                      onClick={() => onComplete(item.id)}
                      >
                        {item.name}
                        <button onClick={() => onDelete(item.id)}>X</button>
                    </li>
                ))}
            </ul>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    className=""
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default App;

import { useEffect, useState } from "react";
import { catalogBooks, defaultLibrary } from "../data/content";

const KEY = "mirath:library";
const EVENT = "mirath:library";

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return defaultLibrary;
}

export function getBook(id) {
  return catalogBooks.find((b) => b.id === id);
}

export function useLibrary() {
  const [ids, setIds] = useState(read);

  useEffect(() => {
    const onSync = (e) => setIds(e.detail);
    window.addEventListener(EVENT, onSync);
    return () => window.removeEventListener(EVENT, onSync);
  }, []);

  const save = (next) => {
    setIds(next);
    localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent(EVENT, { detail: next }));
  };

  const has = (id) => ids.includes(id);

  const toggle = (id) => {
    const added = !ids.includes(id);
    save(added ? [...ids, id] : ids.filter((x) => x !== id));
    return added;
  };

  const remove = (id) => save(ids.filter((x) => x !== id));

  return { ids, has, toggle, remove };
}

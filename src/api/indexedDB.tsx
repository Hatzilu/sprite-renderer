import { useEffect, useState } from "react";

const useIndexedDB = () => {
    const [db, setDb] = useState<IDBDatabase | null>(null);


    const init = (database: IDBDatabase) => {
        if (!database) return;
        const objectStore = database.createObjectStore("assets", {keyPath: "assetName"})
        objectStore.createIndex("assetName", "assetName", { unique: true });
        setDb(database);
    }

    const getObjectStore = (storeName: string, mode: IDBTransactionMode) => {
        if (!db) return null;
        const transaction = db.transaction(storeName, mode);
        return transaction.objectStore(storeName);
    }

    const getItem = (assetName: string) => {
        const objectStore = getObjectStore("assets", "readonly");  
        if (!objectStore) return;
        const request = objectStore?.get(assetName);
        return request;
    }

    const addItem = (item: {assetName: string, data: any}) => {
        const objectStore = getObjectStore("assets", "readwrite");  
        if (!objectStore) return;
        const request = objectStore.add(item);
        return request;
    }

    const removeItem = (item: {assetName: string, data: any}) => {
        const objectStore = getObjectStore("assets", "readwrite");  
        if (!objectStore) return;
        const request = objectStore.delete(item.assetName);
        return request;
    }


    useEffect(() => {
        const request = window.indexedDB.open("assetsDB", 1);

        request.onerror = (event) => {
            console.error("IndexedDB error:", event);
            setDb(null);
        };

        request.onsuccess = (event) => {
            const db = request.result;
            if (db.name === "assets") {
                setDb(db);
            } else {
                init(db);
            }
        };

    }, []);


    return {db, addItem, removeItem, getItem};
};

export default useIndexedDB
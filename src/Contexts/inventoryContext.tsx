import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";
import { Item } from "../data/types";
import { createContext, useState, useEffect } from "react";

type InventoryContextType = {
    inventory: Item[];
};

export const InventoryContext = createContext<InventoryContextType>({
    inventory: [],
});

export function InventoryContextProvider({ children }: any) {
    const [inventory, setInventory] = useState<Item[]>([]);
    

    useEffect(() => {
        const getInventory = async () => {
            const inventoryRef = collection(db, "inventory");
            const inventorySnapshot = await getDocs(inventoryRef);
            const items = inventorySnapshot.docs.map((doc) => doc.data() as Item);
            setInventory(items);
        };
        getInventory();
    }, []);

    if (inventory.length === 0) {
        return <div>Loading...</div>
    }

    return (
        <InventoryContext.Provider value={{ inventory }}>
            {children}
        </InventoryContext.Provider>
    );
}
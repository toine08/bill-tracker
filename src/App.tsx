import { useState, useEffect } from "react";
import {Toaster} from "react-hot-toast";

import NavBar from "./components/NavBar";
import AddBill from "./components/AddBill";
import BillsTable from "./components/BillTable";
import AddCategory from "./components/AddCategory";

export type Bill = {
  amount: number;
  category: string;
  date: Date;
};

function App() {
  const [shouldShowAddCategory, setShouldShowAddCategory] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [shouldShowAddBill, setShouldShowAddBill] = useState(false);
  const [activeCategory, setActiveCategory] = useState('');

  const addCategory = (category: string) => {
    const updatedCategories = [...(categories || []), category];
    setCategories(updatedCategories);
    setShouldShowAddCategory(false);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
  };
  const addBill = (amount: number, category: string, date: Date) => {
    const bill: Bill = { amount, category, date };
    const updatedBills = [...(bills || []), bill];
    setBills(updatedBills);
    setShouldShowAddBill(false);
    localStorage.setItem("bills", JSON.stringify(updatedBills));
  };

  const showAddCategory = () => {
    setShouldShowAddCategory(true);
  };
  const showAddBill = () => {
    setShouldShowAddBill(true);
  };

  const setNewActiveCategory =(category: string)=>{
    setActiveCategory(category)
  }

  const removeBill = (index: number) => {
    let updatedBills = [...bills];
    updatedBills = updatedBills
      .slice(0, index)
      .concat(updatedBills.slice(index + 1, updatedBills.length));
    setBills(updatedBills);
    localStorage.setItem("bills", JSON.stringify(updatedBills));
  };

  const activeBills= ()=>{
    return bills
    ?.filter(bill=>activeCategory ? bill.category === activeCategory : true)
    .sort((a,b)=>(new Date(a.date)< new Date(b.date)? 1 : -1))
  }

  useEffect(() => {
    const categoriesInLocalStorage = localStorage.getItem("categories");
    const billsInLocalStorage = localStorage.getItem("bills");

    if (categoriesInLocalStorage) {
      setCategories(JSON.parse(categoriesInLocalStorage) as string[]);
    }
    if (!categoriesInLocalStorage) {
      setShouldShowAddCategory(true);
    }
    if (billsInLocalStorage) {
      setBills(JSON.parse(billsInLocalStorage) as Bill[]);
    }
    if (!billsInLocalStorage) {
      setShouldShowAddBill(true);
    }
  }, []);

  return (
    <div className="bg-gray-800 min-h-screen dark:text-white">

  <div className="App">

    {shouldShowAddCategory ? (
      <AddCategory addCategory={addCategory} /> 
    ) : shouldShowAddBill ? (
      <AddBill addBill={addBill} categories={categories} />
    ) : (
      <div>
        <NavBar 
          categories={categories}
          showAddCategory={showAddCategory}
          activeCategory={activeCategory}
          setNewActiveCategory={setNewActiveCategory} 
        />
        
        <main className="container mx-auto px-4 py-8">
          <BillsTable 
            bills={activeBills()}
            showAddBill={showAddBill}
            removeBill={removeBill}  
          />
        </main>
        
      </div>
    )}

    <Toaster position="top-right" />

  </div>

</div>
  );
}

export default App;

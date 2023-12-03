import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  addBill: (anount: number, category: string, date: Date) => void;
  categories: string[];
};

function AddBill(props: Props) {
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState(props.categories[0]);
  const [date, setDate] = useState(new Date());

  const handleChangeAmount = (event: ChangeEvent) => {
    let newAmount = parseInt((event.target as HTMLInputElement).value, 10);
    if (isNaN(newAmount)) newAmount = 0;
    setAmount(newAmount);
  };

  const handleChangeDate = (date: Date | null) => {
    if (date) setDate(date);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!amount) {
      toast.error("Please enter a bill",
      {
        style: {
          borderRadius: '10px',
          background: '#2d3748',
          color: '#fff',
        },
      });
      return;
    } else {
      toast.success("Bill added",
      {
        style: {
          borderRadius: '10px',
          background: '#2d3748',
          color: '#fff',
        },
      });
    }
    props.addBill(amount, category || props.categories[0], date);
  };


  return (
<form onSubmit={handleSubmit} className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 text-white">

<div className="mb-4">

  <h1 className="text-gray-100 text-lg font-medium mb-2">Enter a new bill</h1>

  <div className="flex flex-wrap -mx-3 mb-6">
  
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <select 
        onChange={(e) => setCategory(e.target.value)}
        className="bg-gray-700 text-gray-100 border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500"
      >
        {props.categories.map((value, index) => (
          <option key={index} value={value}>
            {value} 
          </option>
        ))}
      </select>
    </div>

    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <DatePicker
        selected={date}
        onChange={handleChangeDate}
        className="bg-gray-700 text-gray-100 border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500" 
      />
    </div>

    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <input
        placeholder="Amount"
        value={amount}
        onChange={handleChangeAmount}
        className="bg-gray-700 text-gray-100 border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500"
      />
    </div>

  </div>

</div>

<div className="flex items-center justify-between">

  <div className="w-full md:w-2/3"></div>

  <div className="w-full md:w-1/3 text-right">
    <button className="bg-gray-600 text-gray-100 hover:bg-gray-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      Add  
    </button>
  </div>

</div>

</form>

  );
}

export default AddBill;

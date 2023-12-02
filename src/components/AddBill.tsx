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
      toast.error("Please enter a bill");
      return;
    } else {
      toast.success("Bill added");
    }
    props.addBill(amount, category || props.categories[0], date);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-100 w-full flex items-center justify-center font-sans"
    >
      <div className="bg-blue-200  rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-grey-darkest">Enter a new bill</h1>
          <div className="flex mt-4">
            <select onChange={(e) => setCategory(e.target.value)}>
              {props.categories
                ? props.categories.map((value, index) => {
                    return (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    );
                  })
                : ""}
            </select>
            <div className="mt-2 ml-1">
              <DatePicker selected={date} onChange={handleChangeDate} />
            </div>
            <input
              placeholder="Add category"
              value={amount}
              onChange={handleChangeAmount}
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
            />
            <button className="flex-no-shrink p-2 border-2 rounded-lg bg-teal bg-green-500 text-white border-none hover:text-white hover:bg-teal">
              Add
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddBill;

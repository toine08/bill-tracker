import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  addCategory: (category: string) => void;
};

function AddCategory(props: Props) {
  const [category, setCategory] = useState("");
  const handleCategory = (event: ChangeEvent) => {
    setCategory((event.target as HTMLInputElement).value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!category) {
      toast.error("Error, please add a category")
      
      return;
    } else {
      toast.success("Category added");
    }
    props.addCategory(category);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8">

  <div className="mb-4">

    <h1 className="text-gray-100 text-lg font-medium mb-2">
      Enter a category of bills
    </h1>

    <p className="text-gray-400 text-sm">
      E.g. 'Electricity' or 'Gas' or 'Internet'
    </p>

    <div className="flex flex-wrap -mx-3 mt-4">
    
      <div className="w-full px-3">
        <input
          placeholder="Add category" 
          value={category}
          onChange={handleCategory}
          className="bg-gray-700 text-gray-100 border border-gray-600 rounded py-3 px-4 leading-tight focus:border-gray-500 focus:bg-gray-600 focus:outline-none" 
        />
      </div>

      <div className="w-full flex items-center justify-between px-3 mt-4">
        <button className="bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add 
        </button>
      </div>

    </div>

  </div>

</form>
  );
}

export default AddCategory;

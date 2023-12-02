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
      toast.error("Please enter a category");
      return;
    } else {
      toast.success("Category added");
    }
    props.addCategory(category);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-100 w-full flex items-center justify-center font-sans"
    >
      <div className="bg-blue-200  rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-grey-darkest">Enter a category of bills</h1>
          <p className="text-small text-grey">
            E.g. 'Electricity' or 'Gas' or 'Internet'
          </p>
          <div className="flex mt-4">
            <input
              placeholder="Add category"
              value={category}
              onChange={handleCategory}
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

export default AddCategory;

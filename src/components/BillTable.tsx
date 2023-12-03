import type { Bill } from "../App";

type Props = {
  bills: Bill[];
  showAddBill: () => void;
  removeBill: (index: number) => void;
};
function BillsTable(props: Props) {
  const triggerShowAddBill = () => {
    props.showAddBill();
  };

  const removeBill = (index: number) => {
    props.removeBill(index);
  };
  return (
    <table className="table w-full">
      <thead className="text-left">
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Montant</th>
          <th scope="col">Categorie</th>
          <th scope="col" />
        </tr>
      </thead>
      <tbody>
        {props.bills?.map((value, index) => {
          return (
            <tr className="p4" key={index}>
              <td>{new Date(value.date).toLocaleDateString()}</td>
              <td>{value.amount} CHF</td>
              <td>{value.category}</td>
              <td colSpan={4} className="text-center pt-5">
              <button onClick={() => removeBill(index)}
  type="button"
  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
>
  <svg 
    className="w-4 h-4" 
    aria-hidden="true" 
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path 
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
      clipRule="evenodd"
    />
  </svg>
</button>
              </td>
            </tr>
          );
        })}
        <tr>
          <td colSpan={4} className="text-center pt-5">
            <button className="underline" onClick={triggerShowAddBill}>
              Add new
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
export default BillsTable;

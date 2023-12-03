type Props = {
  categories: string[];
  showAddCategory: () => void;
  activeCategory: string;
  setNewActiveCategory: (category: string) => void
};
function NavBar(props: Props) {
  const setNewActiveCategory = (category: string) =>{
    props.setNewActiveCategory(category)
  }

  const liStyle = "p-4 inline bg-grey-lighter hover:bg-grey-light uppercase font-black cursor-pointer"
  return (
    <div className="bg-gray-900 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">Bill Tracker</h1> 
      <div>  
        <ul className="list-reset flex">
        {props.categories
          ? props.categories.map((value, index) => {
              return (
                <li
                  className={liStyle + (props.activeCategory === value 
                    ? 'bg-dark-grey' : 'bg-grey-lighter')}
                  key={index}
                  onClick={()=> setNewActiveCategory(value)}
                >
                  {value}
                </li>
              );
            })
          : "<li>No categories</li>"}
              <li
          className={liStyle + (props.activeCategory === '' || props.activeCategory === undefined 
            ? 'bg-dark-grey' : 'bg-grey-lighter')}
            onClick={()=> setNewActiveCategory('')}
          >
            All              
        </li>
        <li
          className={liStyle}
          onClick={() => props.showAddCategory()}
        >
          ➕
        </li>

      </ul>
      </div> 
  </div>
    
  );
}

export default NavBar;

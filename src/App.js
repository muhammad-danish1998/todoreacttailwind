import { useState } from "react";
import "./App.css";
import "./index.css";
import DeleteIcon from "@mui/icons-material/Delete";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
function App() {
  const [inputVal, setInputVal] = useState("");
  const [inputValArr, setInputValArr] = useState([]);
  const [toggleBtn, setToggleBtn] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const addTodo = () => {
    if (inputVal === "") {
      alert("Please add Some Todo");
      }
      
       else if (inputVal && !toggleBtn) {
        setInputValArr(
        inputValArr.map((val) => {
          if (val.id === isEditItem) {
            return { ...val, name: inputVal };
          }
          return val;
        }));
        setInputVal("");
        setToggleBtn(true);
        setIsEditItem(null);
      }
    else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputVal,
      };
      // console.log(allInputData);
      setInputValArr([...inputValArr, allInputData]);
      setInputVal("");
    }
  };
  // ------------------------- Delete indiviual ------------------------- 

  const deleteItem = (index) => {
    const newArr = inputValArr.filter((val) => {
      return index !== val.id;
    });
    setInputValArr(newArr);
  };
  // ------------------------- Delete All ------------------------- 

  const deleteAll = () => {
    setInputValArr([]);
  };

  // ------------------------- edit function ------------------------- 
  const editItem = (id) => {
  
    let newEditItem = inputValArr.find((val) => {
      return val.id === id; 
    });
    // console.log(newEditItem);
    setToggleBtn(false);
    setInputVal(newEditItem.name);
    setIsEditItem(id);
  };
  return (
    <div className=" main-body  lg:p-10 sm:h-full">
      <div className="uperpart lg:mt-12 rounded-md drop-shadow-2xl bg-black max-w-2xl p-4 text-center  mx-auto ">
        <h1 className="text-center font-bold lg:text-5xl text-2xl text-white mb-12">
          What's the plan for Today?
        </h1>
        <input
          className="p-2 lg:w-1/2 w-full text-white  border bg-transparent "
          type="text"
          placeholder="Add a todo"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />

        {toggleBtn ? (
          <button
            onClick={addTodo}
            className="border p-2 xs:w-1/2 mx-1 mt-2 bg-white text-black font-bold"
          >
            Add Todo
          </button>
        ) : (
          <button
            onClick={addTodo}
            className="border p-2 xs:w-1/2 mx-1 mt-2 bg-white text-black font-bold"
          >
            Edit Todo
          </button>
        )}
        <button
          onClick={deleteAll}
          className="border p-2 xs:w-1/2 bg-orange-500 text-white font-bold"
        >
          Delete All
        </button>
        <div className="listItem mt-10">
          <ul className="">
            {inputValArr.map((val, ind) => {
              // console.log(val.name);
              return (
                <div key={val.id}>
                  <li
                    className={`${
                      ind % 2 === 0 ? "blueClr" : "orangeClr"
                    } flex justify-between border mt-4 p-4 font-bold text-lg`}
                  >
                    <span>
                      {`${ind + 1} ) `} {val.name}{" "}
                    </span>
                    <span>
                      <button
                        className=" h-full"
                        onClick={() => deleteItem(val.id)}
                      >
                        <DeleteIcon />
                      </button>
                      <button
                        className=" h-full"
                        onClick={() => editItem(val.id)}
                      >
                        <DesignServicesIcon className="ml-2" />
                      </button>
                    </span>
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

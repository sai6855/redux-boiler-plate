import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [types, setTypes] = useState("");
  const [actions, setActions] = useState("");
  const [functions, setFunctions] = useState("");
  const [dispatches, setDispatches] = useState("");

  const handleGenerate = () => {
    setActions("");

    setFunctions("");
    setDispatches("");

    const { names, typesNames } = handleGenericNames();

    console.log(names, typesNames);
    handleCreateThunkFunctions(names);
    handleCreateactions(names, typesNames);
    handleCreateReducers(names, typesNames);
  };
  //export const DO_MODIFY_LOCAL_SESSION_ORDERS = 'menu/DO_MODIFY_LOCAL_SESSION_ORDERS';

  const handleCreateactions = (names, typesNames) => {
    setActions(() => {
      const actionFunctions = [];

      names.forEach((nam, index) => {
        const actionFunction = `export const ${nam} = createAction(actionTypes.${typesNames[index]});`;
        actionFunctions.push(actionFunction);
      });

      return actionFunctions.join("\n");
    });
  };

  const handleGenericNames = () => {
    let tempTypes = types.split(";");

    let names = [];
    tempTypes.forEach((type) => {
      const divideTypeName = type.split(" ");
      if (divideTypeName[2]) {
        names.push(divideTypeName[2]);
      }
    });

    const typesNames = names;

    names = names.map((name) => {
      let newname = name.split("_");

      newname = newname.map((word, index) => {
        let newword = word.toLowerCase();

        if (index > 0) {
          newword = capitalizeFirstLetter(newword);
          return newword;
        }

        return newword;
      });

      return newname.join("").slice(0, -1);
    });
    return { names, typesNames };
  };

  const handleCreateReducers = (names) => {
    const newFunctions = [];
    names.forEach((genName) => {
      const fName = `[actionCreators.${genName}]:(state,{payload})=>{return {...state}},`;
      newFunctions.push(fName);
    });

    setFunctions(() => newFunctions.join("\n"));
  };

  const handleCreateThunkFunctions = (names) => {
    const newDispatches = [];

    names.forEach((genName, index) => {
      const fName = `export const ${genName} => (payload) => async(dispatch)=>{\ntry{\n}catch(error){\n}\n}`;
      index % 3 === 0 && newDispatches.push(fName);
    });

    setDispatches(() => newDispatches.join("\n\n\n"));
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center"
      }}
    >
      <textarea
        rows="10"
        cols="50"
        value={types}
        onChange={(e) => setTypes(e.target.value)}
        placeholder="Enter your types  
        Types should be follow below structure  
        export const DO_MODIFY_LOCAL_SESSION_ORDERS = 'menu/DO_MODIFY_LOCAL_SESSION_ORDERS';
        "
        style={{ width: "50%" }}
      />

      <button
        style={{
          width: "50%",
          backgroundColor: "#98acf8",
          color: "white",
          border: "none",
          marginTop: "2rem"
        }}
        onClick={handleGenerate}
      >
        Generate
      </button>
      <button
        style={{
          width: "50%",
          backgroundColor: "#98acf8",
          color: "white",
          border: "none",
          marginTop: "0.5rem"
        }}
        onClick={() => {
          setTypes("");
          setActions("");
          setFunctions("");
          setDispatches("");
        }}
      >
        clear everything
      </button>
      <div style={{ display: "flex" }}>
        {actions.length > 0 && (
          <div style={{ width: "30rem" }}>
            <h1>Actions</h1>
            <button
              style={{ width: "4rem", margin: "1rem" }}
              onClick={() => {
                navigator.clipboard.writeText(actions);
              }}
            >
              copy
            </button>
            <textarea rows="10" cols="50" value={actions} />
          </div>
        )}

        {functions.length > 0 && (
          <div style={{ width: "30rem" }}>
            <h1>Reducers</h1>
            <button
              style={{ width: "4rem", margin: "1rem" }}
              onClick={() => {
                navigator.clipboard.writeText(functions);
              }}
            >
              copy
            </button>

            <textarea rows="10" cols="50" value={functions} />
          </div>
        )}
        {dispatches.length > 0 && (
          <div style={{ width: "30rem" }}>
            <h1>Thunk dispatches</h1>
            <button
              style={{ width: "4rem", margin: "1rem" }}
              onClick={() => {
                navigator.clipboard.writeText(dispatches);
              }}
            >
              copy
            </button>

            <textarea rows="10" cols="50" value={dispatches} />
          </div>
        )}
      </div>
    </div>
  );
}

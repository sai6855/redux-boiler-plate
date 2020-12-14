import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [types, setTypes] = useState("");
  const [genericNames, setGenericNames] = useState([]);
  const [actions, setActions] = useState("");
  const [functions, setFunctions] = useState("");

  const handleGenerate = () => {
    setActions("");
    setGenericNames([]);
    setFunctions("");
    handleCreateactions();
    handleCreateReducers();
  };
  //export const DO_MODIFY_LOCAL_SESSION_ORDERS = 'menu/DO_MODIFY_LOCAL_SESSION_ORDERS';

  const handleCreateactions = () => {
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

      return newname.join("");
    });

    setGenericNames(names);

    setActions(() => {
      const actionFunctions = [];

      names.forEach((nam, index) => {
        const actionFunction = `export const ${nam} = createAction(actionTypes.${typesNames[index]});`;
        actionFunctions.push(actionFunction);
      });

      return actionFunctions.join("\n");
    });
  };

  const handleCreateReducers = () => {
    const newFunctions = [];
    console.log(genericNames);
    genericNames.forEach((genName) => {
      const fName = `[actionCreators.${genName}]:(state,{payload})=>{return {...state}}`;
      newFunctions.push(fName);
    });

    setFunctions(() => newFunctions.join("\n"));
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
        placeholder="Enter your types"
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

      {actions.length > 0 && (
        <>
          <h1>Actions</h1>
          <textarea rows="10" cols="50" value={actions} />
        </>
      )}

      {functions.length > 0 && (
        <>
          <h1>Reducers</h1>
          <textarea rows="10" cols="50" value={functions} />
        </>
      )}
    </div>
  );
}

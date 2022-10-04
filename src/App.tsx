import React, { useEffect } from "react";
import { getPlayList, getPlayCatList } from "./api/api";
import LayoutFrame from "./components/Layout";

function App() {
  useEffect(() => {
    getPlayList().then((res) => {
      console.log(res);
    });
    getPlayCatList().then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <div className="App">
      <LayoutFrame />
    </div>
  );
}

export default App;

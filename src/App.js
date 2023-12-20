import React from "react";
// import Navbar from "./Component/Sidebar/Navbar";

import Context from "./ContextProvider/Context";

import Main from "./Component/Outlet/Main";

function App() {
  return (
    <Context>
      <Main />
    </Context>
  );
}

export default App;

import { useState } from "react";
import Navbar from "./Components/Navbar";
import DriveBody from "./Components/DiveBody";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar></Navbar>
      <DriveBody></DriveBody>
    </>
  );
}

export default App;

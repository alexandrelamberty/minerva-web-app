import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-3xl font-bold underline rounded-md bg-slate-600">
        TailwindCSS
      </h1>
    </>
  );
}

export default App;

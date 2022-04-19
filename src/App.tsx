import { motion } from "framer-motion";
import { useState } from "react";
import "./App.css";
import { size, Strut } from "./Strut";

const App = () => {
  const [vari, setVari] = useState<any>("");

  const turnOn = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setVari(["on", "vibe"]);
  };

  const turnOff = () => {
    setVari([]);
  };

  return (
    <div onClick={turnOff} className="App">
      <motion.div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: size * 2,
          height: size * 2,
          backgroundColor: "hsl(0, 50%, 50%)",
          borderRadius: 5,
        }}
        variants={{
          on: {
            y: 10,
            width: size * 1.5,
            height: size * 3,
            borderRadius: 25,
            transition: {
              type: "spring",
            },
          },
        }}
        onClick={turnOn}
        onHoverEnd={turnOff}
        onHoverStart={turnOn}
        animate={vari}
        whileTap="chill"
      >
        <Strut maxDepth={31} />
      </motion.div>
    </div>
  );
};

export default App;

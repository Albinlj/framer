import React, {
  Component,
  FC,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import { Property } from "csstype";

type Props = {
  width: number;
  height: number;
  color: Property.Color;
};
const Strut = styled(motion.div)<Props>(({ width, height, color }) => ({
  backgroundColor: color,
  boxSizing: "border-box",
  // border: "5px solid teal",
  width,
  height,
}));

const Recurse = ({
  Component,
  depth,
}: {
  Component: (props: {
    children: React.ReactNode;
    depth: number;
  }) => JSX.Element;
  depth: number;
}) => {
  return (
    <Component depth={depth}>
      {depth > 1 && <Recurse Component={Component} depth={depth - 1} />}
    </Component>
  );
};

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Strut
          color="hotpink"
          variants={{
            on: {},
          }}
          whileHover="on"
          width={60}
          height={200}
        >
          <Recurse
            Component={({
              children,
              depth,
            }: {
              children: ReactNode;
              depth: number;
            }) => (
              <Strut
                width={50}
                height={50}
                color="honeydew"
                initial={{ x: -50, width: "99%", height: "90%" }}
                custom={depth}
                variants={{
                  on: (i) => ({
                    y: 5 * (10 - i),

                    transition: {
                      delay: 0.03 * i,
                    },
                  }),
                }}
              >
                {children}
              </Strut>
            )}
            depth={10}
          />
        </Strut>
      </header>
    </div>
  );
};

export default App;
// function useToggleInterval(interval: number) {
//   const [on, setOn] = useState(true);
//   const [last, setLast] = useState(Date.now());
//   useEffect(() => {
//     const id = setInterval(() => {
//       if (Date.now() > last + interval) {
//         console.log(last);
//         setOn((prev) => !prev);
//         setLast(Date.now());
//       }
//     }, 100);
//     () => clearInterval(id);
//   }, []);

//   return on;
// }

import { motion } from "framer-motion";
import { FC } from "react";
import "./App.css";

type Props = {
  maxDepth: number;
  depth?: number;
  isSplitting?: 0 | -1 | 1;
};

const size = 20;

const Strut: FC<Props> = ({ depth = 1, maxDepth, isSplitting = 0 }) => {
  const ratio = Math.pow(0.98, depth);
  const shouldSplit = depth % 8 === 1;

  return (
    <motion.div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        width: size * ratio,
        height: size * ratio * 1.5,
        backgroundColor: hsl(depth * 3, 50, 50),
        borderRadius: (size / 2) * ratio,
      }}
      variants={{
        on: () => ({
          y: size * ratio,
          rotate: isSplitting * 60 + Math.floor(Math.random() * 3) * 30 - 30,
          transition: {
            type: "spring",
            bounce: 1,
            damping: 10,
            delayChildren: 0.02 + isSplitting * 0.2,
          },
        }),
        chill: {
          transition: {
            delayChildren: 0.1 + isSplitting * 0.15,
            type: "spring",
            mass: 10,
          },
          rotate: isSplitting * 10 + Math.floor(Math.random() * 3) * 5 - 5,
        },
      }}
    >
      {depth <= maxDepth && (
        <Strut
          depth={depth + 1}
          maxDepth={maxDepth}
          isSplitting={shouldSplit ? 1 : 0}
        />
      )}
      {depth <= maxDepth && shouldSplit && (
        <Strut
          depth={depth + 1}
          maxDepth={maxDepth}
          isSplitting={shouldSplit ? -1 : 0}
        />
      )}
    </motion.div>
  );
};

const App = () => (
  <div className="App">
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
      whileHover="on"
      whileTap="chill"
    >
      <Strut maxDepth={31} />
    </motion.div>
  </div>
);

export default App;

const hsl = (h: number, s: number, l: number, a = 1) =>
  `hsl(${h}, ${s}%, ${l}%, ${a})`;

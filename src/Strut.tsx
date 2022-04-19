import { motion } from "framer-motion";
import { FC } from "react";
import { hsl } from "./utils";

type Props = {
  maxDepth: number;
  depth?: number;
  isSplitting?: 0 | -1 | 1;
};

export const size = 20;

export const Strut: FC<Props> = ({ depth = 1, maxDepth, isSplitting = 0 }) => {
  const ratio = Math.pow(0.98, depth);
  const shouldSplit = depth % 8 === 1;

  return (
    <motion.div
      custom={depth}
      style={{
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        width: size * ratio,
        height: size * ratio * 1.5,
        backgroundColor: hsl(depth * 3, 50, 50),
        borderRadius: (size / 2) * ratio,
        display: "flex",
        x: 0,
      }}
      initial={{ x: 0 }}
      variants={{
        vibe: (i) => ({
          x: [1, -1, 1],
          transition: {
            duration: 1 + Math.random() * 1,
            repeat: 100,
            delay: i * 0.1 + Math.random() * 0.1,
          },
        }),
        on: () => ({
          display: "flex",
          originY: 0,
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
      {depth > maxDepth - 9 && shouldSplit && (
        <>
          <Strut
            depth={depth + 1}
            maxDepth={maxDepth}
            isSplitting={shouldSplit ? -1 : 0}
          />
          <Strut
            depth={depth + 1}
            maxDepth={maxDepth}
            isSplitting={shouldSplit ? -1 : 0}
          />
        </>
      )}
    </motion.div>
  );
};

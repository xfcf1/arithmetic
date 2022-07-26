import { FC, useCallback, useMemo, useState } from "react";
import styles from "./styles.module.css";

enum ESymbol {
  "+" = 0,
  "-",
}
const symbolMaps = new Map([
  ["+", ESymbol["+"]],
  ["-", ESymbol["-"]],
]);
const Normal: FC = () => {
  const getSymbol = useCallback(() => {
    const isMoreThan5 = Math.random() > 0.5;
    return isMoreThan5 ? ESymbol["+"] : ESymbol["-"];
  }, []);
  const [count, setCount] = useState(10);
  const getSubject = useCallback(() => {
    const symbol = getSymbol();
  }, [getSymbol]);
  return <div>Normal{getSubject()}</div>;
};

export default Normal;

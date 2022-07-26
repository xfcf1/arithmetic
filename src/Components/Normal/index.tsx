import { FC, useCallback, useMemo, useState } from "react";
import getNum from "@/utils/getNum";
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
    return isMoreThan5 ? "+" : "-";
  }, []);
  const [count, setCount] = useState(20);
  const getNums = useCallback(() => {
    const symbol = getSymbol();
    let num1 = getNum();
    let num2 = getNum();
    if (symbol === "+") {
      if (num1 + num2 > 10) {
        num2 = 10 - num1;
      }
    } else if (symbol === "-") {
      if (num1 < num2) {
        const a = num1;
        num1 = num2;
        num2 = a;
      }
    }
    return [num1, num2, symbol];
  }, [getSymbol]);
  const getSubject = useCallback(() => {
    return Array.from({ length: count }).map((_, index) => {
      const [num1, num2, symbol] = getNums();
      return (
        <div key={index}>
          <span className={styles.num}>{num1}</span>
          <span className={styles.symbol}>{symbol}</span>
          <span className={styles.num}>{num2}</span>
          <span className={styles.symbol}>=</span>
          <span className={styles.result}>
            <input type="tel" maxLength={2} />
          </span>
        </div>
      );
    });
  }, [count, getNums]);
  return (
    <>
      <div className={styles.normal}>{getSubject()}</div>
      <div>
        <button type="button" className={styles.submit}>
          提交
        </button>
      </div>
    </>
  );
};

export default Normal;

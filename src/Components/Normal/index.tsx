import { FC, useCallback, useState } from "react";
import { useMount } from "ahooks";
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
  const [isCheck, setIsCheck] = useState(false);
  const [count, setCount] = useState(20);
  const [subject, setSubject] = useState<any[]>([]);
  const [result, setResult] = useState<IPlanObj>({});
  // 生成题目
  const getNums = useCallback(() => {
    const symbol = getSymbol();
    const num1 = getNum();
    let num2 = getNum(10 - num1);
    if (symbol === "-") {
      if (num1 < num2) {
        num2 = Math.abs(num2 - num1);
      }
    }
    return [num1, num2, symbol];
  }, [getSymbol]);
  // 循环生成题目
  const getSubject = useCallback(() => {
    const s: any[] = [];
    Array.from({ length: count }).forEach((_, index) => {
      const [num1, num2, symbol] = getNums();
      s.push({ num1, num2, symbol });
    });
    setSubject([...subject, ...s]);
  }, [count, getNums, subject]);
  useMount(() => {
    getSubject();
  });
  // 保存结果
  const inputChange = useCallback(
    (index, value) => {
      result[index] = Number(value);
      setResult({ ...result });
    },
    [result]
  );
  // 根据题目生成dom
  const getDoms = useCallback(() => {
    return subject.map((item, index) => {
      let isRight = true;
      if (isCheck) {
        let truth = 0;
        if (item.symbol === "+") {
          truth = item.num1 + item.num2;
        } else {
          truth = item.num1 - item.num2;
        }
        isRight = result[index] === truth;
      }
      return (
        <div key={index} style={{ color: !isRight ? "red" : "" }}>
          <span className={styles.num}>{item.num1}</span>
          <span className={styles.symbol}>{item.symbol}</span>
          <span className={styles.num}>{item.num2}</span>
          <span className={styles.symbol}>=</span>
          <span className={styles.result}>
            <input
              type="tel"
              maxLength={2}
              onChange={(e) => inputChange(index, e.target.value)}
            />
          </span>
        </div>
      );
    });
  }, [subject, isCheck, result, inputChange]);
  return (
    <>
      <div className={styles.normal}>{getDoms()}</div>
      <div>
        <button
          type="button"
          className={styles.submit}
          onClick={() => setIsCheck(true)}
        >
          提交
        </button>
      </div>
    </>
  );
};

export default Normal;

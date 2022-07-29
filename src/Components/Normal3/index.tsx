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
  const getNums = useCallback(
    (initNum?) => {
      const symbol = getSymbol();
      let num1 = initNum || getNum();
      let num2 = getNum(10 - num1);
      if (symbol === "-") {
        if (num1 < num2) {
          const a = num1;
          num1 = num2;
          num2 = a;
        }
      }
      return [num1, num2, symbol];
    },
    [getSymbol]
  );
  const getSubject = useCallback(() => {
    const s: any[] = [];
    Array.from({ length: count }).forEach((_, index) => {
      const [num1, num2, symbol1] = getNums();
      let r = 0;
      if (symbol1 === "+") {
        r = num1 + num2;
      } else {
        r = num1 - num2;
      }
      const [num3, num4, symbol2] = getNums(r);
      s.push({ num1, num2, symbol1, num3, num4, symbol2 });
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
        if (item.symbol2 === "+") {
          truth = item.num3 + item.num4;
        } else {
          truth = item.num3 - item.num4;
        }
        isRight = result[index] === truth;
      }
      return (
        <div key={index} style={{ color: !isRight ? "red" : "" }}>
          <span className={styles.num}>{item.num1}</span>
          <span className={styles.symbol}>{item.symbol1}</span>
          <span className={styles.num}>{item.num2}</span>
          <span className={styles.symbol}>{item.symbol2}</span>
          <span className={styles.num}>{item.num4}</span>
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

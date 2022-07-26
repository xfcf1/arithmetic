const getNum = (max = 9, min = 1) => {
  return Math.floor(Math.random() * max + min);
};

export default getNum;

import * as React from "react";

type nicLevelProps = {
  index: number;
  level: number;
  count: number;
  setSelectedStrength: any;
};

const NicotineLevel = (props: nicLevelProps) => {
  const { index, level, count, setSelectedStrength } = props;
  return (
    <div
      onClick={() => setSelectedStrength(index)}
      className={`w-full flex justify-center mx-auto p-2 px-1 gap-1   hover:cursor-pointer w-${count}/4 ${
        count > index + 1 && `border-r h-full  `
      }`}
    >
      <div className="flex gap-1 " style={{ transform: "rotateX(180deg)" }}>
        {[3, 6, 12, 18].map((item, index) => (
          <div
            key={index}
            style={{ width: "6px" }}
            className={`border   
             rounded-full ${getNicotineBars(index)}   ${
              level >= item ? "bg-black border-white" : "bg-white border-black"
            }`}
          ></div>
        ))}
      </div>
      <div>{level}</div>
    </div>
  );
};

export default NicotineLevel;

export const getNicotineBars = (index: number) => {
  return index === 0
    ? `h-2/5`
    : index === 1
    ? `h-3/5`
    : index === 2
    ? `h-4/5`
    : `h-5/5`;
};

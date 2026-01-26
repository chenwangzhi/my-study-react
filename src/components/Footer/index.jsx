import { useState } from "react";
import "./Footer.scss";

export default function Footer() {
  const [count, setCount] = useState(0);

  // 期望点击后 count 加 2，但实际只会加 1
  const addTwo = () => {
    setCount(count + 1); // 这里的 count 是「当前渲染的快照值」（比如 0）
    setCount(count + 1); // 还是用同一个快照值（0），所以两次都是 setCount(1)
  };

  return (
    <div className="footer-container">
      <p className="counter-display">
        Count: {count}
      </p>
      <button 
        onClick={addTwo}
        className="counter-button"
      >
        点击加2
      </button>
    </div>
  );
}
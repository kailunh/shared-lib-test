import React, { useState } from 'react';

const SharedButton = () => {
  const [count, setCount] = useState(0)
  const handleClick = () => {
    setCount(count+1)
  }
  return (
   <button onClick={()=> handleClick()}>Has been clicked {count} times</button>
  );
}

export default SharedButton;
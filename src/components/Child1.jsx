import React, { useCallback, useEffect, useState } from "react";

function Child1({ props, val }) {
  const [name, setName] = useState();
  const handleClick = () => {
    props();
  };
  const myCallback = useCallback(() => {
    const setUserName = () => {
      setName(Math.random());
    };
  }, []);

  useEffect(() => {
    console.log("value changed");
  }, [val, props, myCallback]);

  return (
    <div>
      {name}
      {val}
      <button onClick={handleClick}>clickme</button>
    </div>
  );
}

export default Child1;

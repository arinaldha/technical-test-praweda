import React from "react";

export function useToggle(initialValue?: boolean): [boolean, () => void] {
  const [toggle, setToggle] = React.useState(initialValue ?? false);

  const handleOnToggle = () => {
    setToggle((prev) => !prev);
  };

  return [toggle, handleOnToggle];
}
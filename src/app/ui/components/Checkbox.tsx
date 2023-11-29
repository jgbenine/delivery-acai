import React from "react";

interface CheckboxProps{
  index: number;
  htmlFor: string;
  contentText: string;
  price: number;
  name: string;
  value: number;
  idValue: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: number) => void;
}

export function Checkbox(props: CheckboxProps) {
  return (
    <label key={props.index} htmlFor={props.htmlFor}>
      <p>{props.contentText}</p>
      <span>
        +R${props.price}
        <input
          type="checkbox"
          name={props.name}
          id={props.contentText}
          value={props.value}
          onChange={(event) => props.onChange(event, props.value)}
        />
      </span>
    </label>
  );
}

import React from "react";

interface RadioProps{
  index: number;
  htmlFor: string;
  contentText: string;
  price: number;
  name: string;
  value: number;
  idValue: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: number) => void;
}

export function Radio(props: RadioProps) {
  return (
    <label key={props.index} htmlFor={props.htmlFor}>
      <p>{props.contentText}</p>
      <span>
        R${props.price}
        <input
          type="radio"
          name={props.name}
          id={props.contentText}
          value={props.value}
          onChange={(event) => props.onChange(event, props.value)}
        />
      </span>
    </label>
  );
}

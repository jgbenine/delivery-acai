import { ReactNode } from "react";
import '../styles/checkout.module.css'


interface CheckboxProps {
  index: number;
  htmlFor: string;
  contentText: string;
  price: number;
  name: string;
  value: number;
  idValue: string;
  icon: ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: number) => void;
}

export function Checkbox(props: CheckboxProps) {
  return (
    <label key={props.index} htmlFor={props.htmlFor}>
      <span className="wrapper-intro">
        {props.icon}
        {props.contentText}</span>
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

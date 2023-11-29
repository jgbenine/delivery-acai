import styles from '../styles/intro.module.css'

interface IntroSelectProductProps {
  labelText: string;
  descriptionOption: string;
  stepOption: string;
}
export function IntroSelectProdutc(props: IntroSelectProductProps) {
  return (
    <div className={styles.intro}>
      <span>
        <h4>{props.labelText}</h4>
        <p>{props.descriptionOption}</p>
      </span>
      <p>{props.stepOption}</p>
    </div>
  );
}

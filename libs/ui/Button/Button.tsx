import type { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import classNames from "classnames";

import styles from "./Button.module.css";

const Button: FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ disabled, ...props }) => {
  return (
    <button
      {...props}
      className={classNames(styles.btn, { [styles.primary]: true })}
      disabled={disabled}
    />
  );
};

export default Button;

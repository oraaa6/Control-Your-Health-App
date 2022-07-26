import clsx from "clsx";
import "./button.scss";

type PropTypes = {
  text: string;
  className?: string;
  onClick?: () => void;
};

const Button = ({ text, className, onClick }: PropTypes) => {
  return (
    <button onClick={onClick} className={clsx("button", className)}>
      {text}
    </button>
  );
};

export default Button;

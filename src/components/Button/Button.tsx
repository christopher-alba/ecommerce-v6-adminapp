import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, ReactNode } from "react";
import "./button.scss";

export enum Theme {
  PRIMARY = "primary-button",
  SECONDARY = "secondary-button",
  TERTIARY = "tertiary-button",
}

const Button: FC<{
  theme: Theme;
  icon: IconProp;
  children: ReactNode;
  onClick: () => void;
  className?: string;
  fluid?: boolean;
}> = ({ theme, icon, children, onClick, className, fluid }) => {
  return (
    <button
      onClick={onClick}
      id="button"
      className={`${theme} ${className}`}
      style={{ width: fluid ? "100%" : "fit-content" }}
    >
      <div id="button-children-wrapper">{children}</div>
      <div id="button-icon-wrapper">
        <FontAwesomeIcon icon={icon} />
      </div>
    </button>
  );
};

export default Button;

import { FC } from "react";
import "./router-link.scss";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const RouterLink: FC<{
  path: string;
  name: string;
  iconProp: IconProp;
}> = ({ path, name, iconProp }) => {
  return (
    <Link className="router-link" to={path}>
      <div className="router-link-inner">
        <p>{name}</p>
        <div className="router-link-icon">
          <FontAwesomeIcon icon={iconProp} />
        </div>
      </div>
    </Link>
  );
};

export default RouterLink;

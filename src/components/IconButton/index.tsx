import React from "react";

import { IconButtonContainer } from "./styles";

const IconButton: React.FC<{
  icon: string;
  label?: string;
  color?: string;
  description?: string;
  type?: string;
  onClick?: () => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  [k: string]: unknown;
}> = ({
  icon,
  label,
  color,
  description,
  onClick,
  type,
  onChange,
  ...props
}) => {
  return (
    <a href={props.href as string} target="blank">
      <label>
        <IconButtonContainer
          color={color}
          title={description || label}
          onClick={onClick}
        >
          <img src={icon} alt={label} />
          <label>{label}</label>
        </IconButtonContainer>
      </label>
    </a>
  );
};

export default IconButton;

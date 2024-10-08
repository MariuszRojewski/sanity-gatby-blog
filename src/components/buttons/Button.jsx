import React from "react";
import { buttonType } from "../../constans/buttonType.js";
import { ButtonStyles } from "../../styles/buttons/ButtonStyles";

function Button({ children, tag, variant = buttonType.primary, ...props }) {
  return (
    <ButtonStyles as={tag} {...props} variant={variant}>
      {children}
    </ButtonStyles>
  );
}

export default Button;

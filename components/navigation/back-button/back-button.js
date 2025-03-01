import { PageFirst } from "@carbon/react/icons";
import { Button } from "@carbon/react";
import classes from "./backButton.module.scss";

function BackButton({ click }) {
  return (
      <Button lable="Back" className={ `${ classes.backButton } shadow` } onClick={ click }>
        <PageFirst size={ 24 } className={ classes.backArrow } />
      </Button>
  );
}

export default BackButton;
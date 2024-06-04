import {Button} from "@carbon/react";

function ShowHideChartButton({ onClick, children }) {
  return (
      <Button size="sm"
              kind="ghost"
              onClick={onClick}
      >
        { children }
      </Button>
  );
}

export default ShowHideChartButton;
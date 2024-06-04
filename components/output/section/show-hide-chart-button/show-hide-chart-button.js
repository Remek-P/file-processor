import { Button, Tooltip } from "@carbon/react";

function ShowHideChartButton({ onClick, children }) {
  return (
      <Tooltip align="top" description="toggle chart" closeOnActivation={true}>
      <Button size="sm"
              kind="ghost"
              onClick={onClick}
      >
        { children }
      </Button>
      </Tooltip>
  );
}

export default ShowHideChartButton;
import { Button, Tooltip } from "@carbon/react";

function ActionToggle({
                        onClick,
                        align = "top",
                        description,
                        closeOnActivation = true,
                        size = "sm",
                        kind = "ghost",
                        children
}) {
  return (
      <Tooltip align={align} description={description} closeOnActivation={closeOnActivation}>
      <Button size={size}
              kind={kind}
              onClick={onClick}
      >
        { children }
      </Button>
      </Tooltip>
  );
}

export default ActionToggle;
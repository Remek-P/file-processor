import { Button, Tooltip } from "@carbon/react";

function ActionToggle({
                        onClick,
                        align = "top",
                        description,
                        closeOnActivation = true,
                        size = "sm",
                        kind = "ghost",
                        value = null,
                        valueRef,
                        children
}) {
  return (
      <Tooltip align={align} description={description} closeOnActivation={closeOnActivation}>
      <Button size={size}
              kind={kind}
              onClick={onClick}
              value={value}
              ref={valueRef}
      >
        { children }
      </Button>
      </Tooltip>
  );
}

export default ActionToggle;
import * as Tooltip from "@radix-ui/react-tooltip";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
 0% { opacity: 0; }
 100% { opacity: 1; }
`;

const TooltipContent = styled(Tooltip.Content)`
  background: hsl(266deg 100% 15%);
  color: hsl(266deg 100% 96%);
  line-height: 1.2;
  padding: 6px 8px;
  font-size: 1.3rem;
  border-radius: 4px;
  text-align: center;
  max-width: 10rem;
  animation: ${fadeIn} 250ms ease-out;
  &::before {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }
`;

function TooltipArea({ Trigger, content, ...props }) {
  return (
    <Tooltip.Provider delayDuration={250}>
      <Tooltip.Root {...props}>
        <Tooltip.Trigger asChild>{Trigger}</Tooltip.Trigger>
        <Tooltip.Portal>
          <TooltipContent sideOffset={7}>{content}</TooltipContent>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export { TooltipArea as Tooltip };

import React from "react";
import {
  PopoverTrigger,
  PopoverContent,
  Root,
  Portal,
} from "@radix-ui/react-popover";
import { Root as DialogRoot } from "@radix-ui/react-dialog";
import { ReactNode } from "react";

export interface Action {
  className?: string;
  label: string | ReactNode;
  onClick?: () => void;
}

export interface ActionModalProps {
  actionButton?: ReactNode;
  actions: Action[];
  children?: ReactNode;
}

const ActionModal: React.FC<ActionModalProps> = ({ actionButton, actions }) => {
  return (
    <Root>
      <PopoverTrigger>{actionButton ?? "..."}</PopoverTrigger>
      <Portal>
        <PopoverContent
          sideOffset={2}
          className="bg-white z-50 min-w-[160px] border rounded-2xl  bg-popover p-4 text-popover-foreground shadow-2xl outline-none animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
        >
          <DialogRoot>
            {actions.map(({ label, onClick, className }, key) => {
              const modifiedChildren = React.Children.map(
                label,
                (child, key) => {
                  if (React.isValidElement(child)) {
                    return React.cloneElement(
                      child,
                      {
                        key: key,
                      } as React.AllHTMLAttributes<HTMLElement>,
                      <div
                        className={`flex w-full items-center space-x-2 py-2 cursor-pointer ${
                          className ?? ""
                        }`}
                      >
                        <span className="w-full text-sm h-full text-gray-900 font-medium inline-block">
                          {child.props.children}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <button
                      className={`flex w-full  items-center space-x-2 p-2   cursor-pointer text-sm text-gray-900 leading-4 font-medium ${
                        className ?? ""
                      }`}
                      key={key}
                      onClick={() => {
                        onClick?.();
                      }}
                    >
                      <span>{child}</span>
                    </button>
                  );
                }
              );
              return (
                <React.Fragment key={key}>{modifiedChildren}</React.Fragment>
              );
            })}
          </DialogRoot>
        </PopoverContent>
      </Portal>
    </Root>
  );
};

export default ActionModal;

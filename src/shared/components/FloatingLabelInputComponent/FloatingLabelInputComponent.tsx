"use client";
import { useState, useRef, useEffect } from "react";
import { Input, type InputRef } from "antd";
import "./style/style.scss";
import type { IFloatingLabelInputConfigs } from "../../utils/interface.util";



const FloatingLabelInputComponent = (props: IFloatingLabelInputConfigs) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    const input = inputRef.current?.input;
    if (!input) return;

    const handleFocusIn = () => {
      setIsFocused(true);
    };

    const handleFocusOut = () => {
      setIsFocused(false);
    };

    input.addEventListener("focusin", handleFocusIn);
    input.addEventListener("focusout", handleFocusOut);

    // If autoFocus is true, focus the input after mounting
    if (props.autoFocus) {
      input.focus();
    }

    return () => {
      input.removeEventListener("focusin", handleFocusIn);
      input.removeEventListener("focusout", handleFocusOut);
    };
  }, [props.autoFocus]);

  useEffect(() => {
    const handleAutoFill = (event: AnimationEvent) => {
      if (event.animationName === "onAutoFillStart") {
        setIsFocused(true); // Simulate focus when auto-filled
      } else if (event.animationName === "onAutoFillCancel") {
        setIsFocused(false);
      }
    };

    const input = inputRef.current?.input;
    if (!input) return;

    input.addEventListener("animationstart", handleAutoFill);

    return () => {
      input.removeEventListener("animationstart", handleAutoFill);
    };
  }, []);
  return (
    <div className="w-full h-full floating-label-input-wrapper">
      <div className="flex flex-col items-start gap-[6px] h-full relative">
        <Input
          ref={inputRef}
          defaultValue={props?.initialValue}
          className={`${props?.className} peer`}
          disabled={props?.isDisabled || false}
          suffix={props?.suffix}
          type={props?.type || "text"}
          value={props?.value}
          placeholder=" "
          autoFocus={props.autoFocus}
          onChange={(e) => {
            props?.onChange?.(e.target.value);
          }}
        />
        {props.label && (
          <span
            className={`absolute transition-all duration-200 text-gray-90 pointer-events-none left-[14px] text-center align-middle pc-caption-info
              ${
                isFocused || props.value || props.initialValue
                  ? "transform translate-y-[8px] laptop:translate-y-[10px] text-xs"
                  : "transform translate-y-[20px] laptop:translate-y-[24px]"
              }`}
          >
            {props.required && <span className="text-red-500 mr-0.5">*</span>}

            {props.label}
          </span>
        )}
      </div>
    </div>
  );
};

export default FloatingLabelInputComponent;

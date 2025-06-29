import { Select } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { useEffect, useState, useRef } from "react";
import "./style.scss";
import type { IFloatingLabelSelectProps } from "../../utils/interface.util";
import { isNullOrEmpty, normalizeText } from "../../utils/function.util";

const FloatingLabelSelectComponent = (props: IFloatingLabelSelectProps) => {
  const { options } = props;
  const [isDropdownVisible, setIsDropdownVisible] = useState(props?.open);
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectRef = useRef<any>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState(props?.defaultValue);

  useEffect(() => {
    if (isNullOrEmpty(props?.value)) {
      return;
    }
    setValue(props?.value);
  }, [props?.value]);
  useEffect(() => {
    const select = selectRef.current?.selectRef;
    if (!select) return;

    const handleFocusIn = () => {
      setIsFocused(true);
    };

    const handleFocusOut = () => {
      setIsFocused(false);
    };

    select.addEventListener("focusin", handleFocusIn);
    select.addEventListener("focusout", handleFocusOut);

    if (props.autoFocus) {
      select.focus();
    }

    return () => {
      select.removeEventListener("focusin", handleFocusIn);
      select.removeEventListener("focusout", handleFocusOut);
    };
  }, [props.autoFocus]);

  // Detect clicks outside of the component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className=" w-full floating-label-select-wrapper flex flex-col items-start gap-[6px] h-full relative custom-select-wrapper"
    >
      <Select
        ref={selectRef}
        value={value}
        mode={props?.mode}
        defaultValue={props?.defaultValue}
        onClick={props?.onClick}
        maxCount={props?.maxCount}
        open={isDropdownVisible}
        showSearch={props?.allowSearch}
        allowClear={props?.allowClear}
        labelRender={props?.labelRender}
        optionRender={props?.optionRender}
        searchValue={searchValue}
        onSearch={(value) => setSearchValue(value)}
        filterOption={
          props?.filterOption ||
          ((input, option) => {
            const normalizedInput = normalizeText(input);
            const normalizedOption = normalizeText(
              option?.children?.toString() || ""
            );
            return normalizedOption.includes(normalizedInput);
          })
        }
        placeholder={props?.placeholder || ""}
        className={`${props?.className} peer`}
        disabled={props?.isDisabled || false}
        onChange={(e) => {
          props?.onSelectChange?.(e);
          setValue(e);
          setSearchValue(""); // Clear search value when an option is selected
        }}
        onDropdownVisibleChange={(visible) => {
          setIsDropdownVisible(visible);
          if (!visible) {
            setSearchValue(""); // Clear search value when dropdown closes
          }
        }}
        dropdownRender={
          props?.dropdownRender ||
          ((children) => (
            <div className="floating-label-custom-select-dropdown min-w-max">
              {children}
            </div>
          ))
        }
        suffixIcon={
          props?.suffixIcon || isDropdownVisible ? (
            <UpOutlined className="custom-select-arrow-icon" />
          ) : (
            <DownOutlined className="custom-select-arrow-icon" />
          )
        }
        options={options}
      />
      {!!props?.label && (
        <span
          className={`floating-label absolute z-99 transition-all duration-200 pointer-events-none left-[14px] text-center align-middle mobile-caption-info laptop:pc-caption-info
              ${isDropdownVisible ? "text-white laptop:text-white" : "text-gray-90 "}

              ${
                isFocused || !isNullOrEmpty(value) || isDropdownVisible
                  ? "transform translate-y-[8px] laptop:translate-y-[10px] text-xs"
                  : "transform translate-y-[20px] laptop:translate-y-[24px]"
              }`}
        >
          {props.required && <span className="text-red-500 mr-0.5">*</span>}
          {props.label}
        </span>
      )}
    </div>
  );
};

export default FloatingLabelSelectComponent;

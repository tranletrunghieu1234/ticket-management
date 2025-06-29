/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SelectProps } from "antd";
import type { ReactNode } from "react";

export interface IDataSourceTickets {
  assigneeId?: number;
  assigneeName?: string;
  completed?: boolean;
  description?: string;
  key?: number;
  order?: number;
  status?: string;
  id?: number;
  fullTextSearch?: string;
}

export interface IDataTable {
  dataSource: IDataSourceTickets[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  column: any;
  isLoading?: boolean
}

export interface IColumnConfig {
  order: string;
  description: string;
  assigneeName: string;
  status?: string;

}

export interface IPrimaryButtonConfig extends IClickHandler {
  isDisabled?: boolean;
  loading?: boolean;
  className?: string;
  title?: ReactNode;
}

export interface IClickHandler {
  onClickHandler?: () => void;
}

export interface ICreateTicket {
  isShowModal?: boolean;
  setIsShowModal?: (value: boolean) => void;
  onFinish?: () => void;
}

export interface IAssignTicket {
  isShowModal?: boolean;
  setIsShowModal?: (value: boolean) => void;
  onFinish?: () => void;
  ticketId?: number;
  userList: IUser[],
  initialUserId?: number;
}

export interface ICompleteTicket {
  isShowModal?: boolean;
  setIsShowModal?: (value: boolean) => void;
  onFinish?: () => void;
  ticketId?: number;
  assignId?: number;
  titleTicket?: string;
  assigneeName?: string;
}

export interface IUnassignTicket {
  isShowModal?: boolean;
  setIsShowModal?: (value: boolean) => void;
  onFinish?: () => void;
  ticketId?: number;
  assignId?: number;
  titleTicket?: string;
  assigneeName?:string;
}

export interface IFloatingLabelInputConfigs {
  initialValue?: string;
  className?: string;
  isDisabled?: boolean;
  suffix?: React.ReactNode;
  type?: string;
  placeholder?: string;
  value?: string;
  label?: string;
  required?: boolean;
  autoFocus?: boolean;
  onChange?: (value: string) => void;
}

export interface IUser {
  id?: number;
  name?: string;
}

export interface ISelectConfig {
  placeholder: string;
  maxCount?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dropdownRender?: any;
  defaultValue?: string | number;
  mode?: "multiple" | "tags";
  optionRender?: (option: any) => ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelectChange?: (e: any) => void;
  allowSearch?: boolean;
  isDisabled?: boolean;
  className?: string;
  options: IOption[];
}


export interface IOption {
  id?: string | number;
  value?: any;
  name?: string;
  label?: string | ReactNode;
  [key: string]: any;
}


export interface ISelectConfig {
  placeholder: string;
  maxCount?: number;
  dropdownRender?: any;
  defaultValue?: string | number;
  mode?: "multiple" | "tags";
  optionRender?: (option: any) => ReactNode;
  onSelectChange?: (e: any) => void;
  allowSearch?: boolean;
  isDisabled?: boolean;
  className?: string;
  options: IOption[];
}

export interface IFloatingLabelSelectProps extends Partial<SelectProps> {
  label?: string;
  required?: boolean;
  isDisabled?: boolean;
  allowSearch?: boolean;
  allowClear?: boolean;
  autoFocus?: boolean;
  onClick?: (e: any) => void;
  onSelectChange?: (value: any) => void;
  className?: string;
  mode?: "multiple" | "tags"; // AntD supports these in Select
  defaultValue?: any;
  value?: any;
  maxCount?: number; // custom extension
  options?: IOption[];
  suffixIcon?: ReactNode;
  placeholder?: string;
  filterOption?: (input: string, option?: any) => boolean;
  open?: boolean;
}
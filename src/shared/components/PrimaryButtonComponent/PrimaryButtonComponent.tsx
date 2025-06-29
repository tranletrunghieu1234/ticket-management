import { Button } from "antd";
import "./styles/style.scss";
import type { IPrimaryButtonConfig } from "../../utils/interface.util";
const PrimaryButtonComponent = (props: IPrimaryButtonConfig) => {
  const { title, onClickHandler =()=>{} } = props;
  return (
    <div className={`custom-btn-primary h-full  ${props?.className}`}>
      <Button
        loading={props?.loading}
        onClick={(e) => {
          e.stopPropagation();
          onClickHandler();
        }}
        disabled={props?.isDisabled}
        className="h-full"
      >
        {title}
      </Button>
    </div>
  );
};
export default PrimaryButtonComponent;

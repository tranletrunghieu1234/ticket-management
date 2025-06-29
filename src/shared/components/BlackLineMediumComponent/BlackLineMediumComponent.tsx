import { Button } from "antd";
import "./styles/style.scss";
import type { IPrimaryButtonConfig } from "../../utils/interface.util";
const BlackLineMediumComponent = (props: IPrimaryButtonConfig) => {
  const { title, onClickHandler =()=>{} } = props;

  return (
    <>
      <div className="custom-black-line-medium-pc-button h-full">
        <Button
          loading={props?.loading}
          onClick={(e) => {
            e.stopPropagation();
            onClickHandler();
          }}
          className="h-full"
          disabled={props?.isDisabled}
        >
          {title}
        </Button>
      </div>
    </>
  );
};
export default BlackLineMediumComponent;

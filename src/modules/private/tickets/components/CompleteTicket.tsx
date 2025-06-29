import { message, Modal } from "antd";
import PrimaryButtonComponent from "../../../../shared/components/PrimaryButtonComponent/PrimaryButtonComponent";
import { useState } from "react";
import BlackLineMediumComponent from "../../../../shared/components/BlackLineMediumComponent/BlackLineMediumComponent";
import { catchError, delay, finalize, from, tap, throwError } from "rxjs";
import { GET_LIST_TICKET } from "../../../../constants/api.const";
import { methodPutService } from "../../../../shared/utils/api-helper";
import type { ICompleteTicket } from "../../../../shared/utils/interface.util";
import { FaRegCircleQuestion } from "react-icons/fa6";

const CompleteTicket = (props: ICompleteTicket) => {
	const { isShowModal, ticketId, titleTicket,  setIsShowModal = () => { }, onFinish = () => { } } = props;
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [messageApi, contextHolder] = message.useMessage();

	const onCompleteTicket = () => {
		const url = `${GET_LIST_TICKET}/${ticketId}/complete`;
		return from(methodPutService(url))
	}
	const onSubmit = () => {
		setIsLoading(true);
		onCompleteTicket().pipe(
			catchError((error) => {
				messageApi.error("Something went wrong");
				return throwError(() => new Error(error?.message));
			}),
			tap(() => {
				messageApi.success("Complete ticket successfully!");
			}),
			delay(1500),
			finalize(() => {
				setIsLoading(false);
			}),
		).subscribe(() => {
			onFinish();
			setIsShowModal(false);
		})

	}

	return <div>
		{contextHolder}
		<Modal
			closable={false}
			centered
			width={"40vw"}
			style={{ top: 12 }}
			styles={{
				header: {
					position: "sticky",
					padding: "40px 0px 0px",
					top: "0",
					transform: "translateY(-10px)",
					zIndex: 101,
					background: "white",
				},

				footer: {
					position: "sticky",
					bottom: 0,
					zIndex: 101,
					padding: "20px 0 30px",
					background: "white",
				},
				content: {
					padding: "0 40px",
					maxHeight: "95vh",
					overflowY: "auto",
					borderRadius: "20px",
				},
			}}
			title={
				<p className="flex gap-1 items-center">
					<FaRegCircleQuestion />
					<span className="font-bold">Confirm</span>
				</p>
			}
			footer={
				<div className="flex justify-end items-center gap-3 w-full">
					<div className="w-1/3 h-[47px]">
						<BlackLineMediumComponent
							title="Cancel"
							onClickHandler={() => {
								setIsShowModal(false);
							}}
						/>
					</div>
					<div className="w-1/3 h-[47px]">
						<PrimaryButtonComponent
							title="Submit"
							loading={isLoading}
							onClickHandler={onSubmit}
						/>
					</div>
				</div>
			}
			open={isShowModal}
		>
		<p>
		<span>
				Do you want to complete ticket:
		</span>
		<span className="font-bold ml-1">{titleTicket}</span>
		</p>
		</Modal>
	</div>
}

export default CompleteTicket;
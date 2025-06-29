import { Form, message, Modal } from "antd";
import type { ICreateTicket } from "../../../../shared/utils/interface.util";
import PrimaryButtonComponent from "../../../../shared/components/PrimaryButtonComponent/PrimaryButtonComponent";
import { useState } from "react";
import BlackLineMediumComponent from "../../../../shared/components/BlackLineMediumComponent/BlackLineMediumComponent";
import { useForm } from "antd/es/form/Form";
import FloatingLabelInputComponent from "../../../../shared/components/FloatingLabelInputComponent/FloatingLabelInputComponent";
import { catchError, delay, finalize, from, switchMap, tap, throwError } from "rxjs";
import { methodPostService } from "../../../../shared/utils/api-helper";
import { CREATE_TICKET } from "../../../../constants/api.const";

const CreateTicket = (props: ICreateTicket) => {
	const { isShowModal, setIsShowModal = () => { }, onFinish = () => { } } = props;
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [formTicket] = useForm();
	const [messageApi, contextHolder] = message.useMessage();

	const createTicket = () => {
		const payload = {
			description: formTicket.getFieldValue("description")
		}
		return from(methodPostService(CREATE_TICKET, payload))
	}
	const onSubmit = () => {
		setIsLoading(true);
		from(formTicket.validateFields()).pipe(
			catchError((error) => {
				messageApi.error("Please fill in all the required fields!");
				return throwError(() => new Error(error?.message));
			}),
			switchMap(() => createTicket()),
			tap(()=>{
				messageApi.success("Create ticket successfully!");
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
				<p className="font-bold">
					Create ticket
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
			<Form
				form={formTicket}
			>
				<Form.Item
					name="description"
					labelCol={{ span: 24 }}
					rules={[
						{
							required: true,
							message: "The field is required"
						},
					]}
				>
					<FloatingLabelInputComponent
						label="Description"
						required
						onChange={(e) => {
							formTicket.setFieldValue("description", e);
						}}
						className="px-[14px] py-[10px]"
					/>
				</Form.Item>
			</Form>
		</Modal>
	</div>
}

export default CreateTicket;
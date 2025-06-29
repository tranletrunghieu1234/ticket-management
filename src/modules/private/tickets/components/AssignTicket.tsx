import { Form, message, Modal } from "antd";
import type { IAssignTicket, IOption } from "../../../../shared/utils/interface.util";
import PrimaryButtonComponent from "../../../../shared/components/PrimaryButtonComponent/PrimaryButtonComponent";
import { useEffect, useState } from "react";
import BlackLineMediumComponent from "../../../../shared/components/BlackLineMediumComponent/BlackLineMediumComponent";
import { useForm } from "antd/es/form/Form";
import { catchError, delay, finalize, from, switchMap, tap, throwError } from "rxjs";
import FloatingLabelSelectComponent from "../../../../shared/components/FloatingLabelSelectComponent/FloatingLabelSelectComponent";
import { isNullOrEmpty } from "../../../../shared/utils/function.util";
import { GET_LIST_TICKET } from "../../../../constants/api.const";
import { methodPutService } from "../../../../shared/utils/api-helper";

const AssignTicket = (props: IAssignTicket) => {
	const { isShowModal, ticketId, userList, initialUserId, setIsShowModal = () => { }, onFinish = () => { } } = props;
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [formAssign] = useForm();
	const [messageApi, contextHolder] = message.useMessage();
	const [internalUser, setInternalUser] = useState<IOption[]>([]);

	const assignTicket = () => {
		const userId = formAssign.getFieldValue("userId");
		const url = `${GET_LIST_TICKET}/${ticketId}/assign/${userId}`;
		return from(methodPutService(url))
	}
	const onSubmit = () => {
		setIsLoading(true);
		from(formAssign.validateFields()).pipe(
			catchError((error) => {
				messageApi.error("Please fill in all the required fields!");
				return throwError(() => new Error(error?.message));
			}),
			switchMap(assignTicket),
			tap(() => {
				messageApi.success("Assign ticket successfully!");
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



	useEffect(() => {
		if (!isNullOrEmpty(userList)) {
			const mappingOptionUser = userList.map(res => {
				return {
					label: res?.name,
					value: res?.id,
				}
			});
			setInternalUser(mappingOptionUser);
		}
	}, [userList])
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
					Assign ticket
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
				form={formAssign}
			>
				<Form.Item
					className="w-full"
					name="userId"
					labelCol={{ span: 24 }}
					rules={[
						{
							required: true,
							message: "The field is required"
						},
					]}

				>
					<FloatingLabelSelectComponent
					defaultValue={initialUserId}
						required
						label="User"
						options={internalUser}
						onSelectChange={(value: number) => {
							formAssign?.setFieldValue("userId", value);
						}}
						allowClear
					/>
				</Form.Item>
			</Form>
		</Modal>
	</div>
}

export default AssignTicket;
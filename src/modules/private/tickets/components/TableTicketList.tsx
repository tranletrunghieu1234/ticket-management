import Table from "antd/es/table";
import type { IDataTable } from "../../../../shared/utils/interface.util";

const TableTicketList = (props: IDataTable) => {
	return <Table 
	rowKey="id"
	dataSource={props?.dataSource}
	columns={props?.column} 
	scroll={{ y: 200 }}
	loading={props?.isLoading}
	size="small"
	className="w-full"
	/>
}
export default TableTicketList;
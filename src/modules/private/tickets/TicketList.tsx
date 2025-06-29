import { useCallback, useEffect, useState } from "react";
import TableTicketList from "./components/TableTicketList";
import { finalize, from, map, switchMap, tap } from "rxjs";
import { methodGetService } from "../../../shared/utils/api-helper";
import { GET_LIST_TICKET, GET_LIST_USER } from "../../../constants/api.const";
import { Button, Tag, Tooltip, type TableProps } from "antd";
import type { IColumnConfig, IDataSourceTickets, IUser } from "../../../shared/utils/interface.util";
import { isNullOrEmpty } from "../../../shared/utils/function.util";
import PrimaryButtonComponent from "../../../shared/components/PrimaryButtonComponent/PrimaryButtonComponent";
import CreateTicket from "./components/CreateTicket";
import { StatusEnum } from "../../../shared/utils/common.enum";
import { LuNotebookPen } from "react-icons/lu";
import AssignTicket from "./components/AssignTicket";
import { FaCheck, FaUndo } from "react-icons/fa";
import CompleteTicket from "./components/CompleteTicket";
import UnassignTicket from "./components/UnassignTicket";
import { IoIosRefresh, IoMdClose } from "react-icons/io";
import InCompleteTicket from "./components/InCompleteTicket";
import FloatingLabelInputComponent from "../../../shared/components/FloatingLabelInputComponent/FloatingLabelInputComponent";

const TicketList = () => {

  const [dataSource, setDataSource] = useState<IDataSourceTickets[]>([]);
  const [originalDataSource, setOriginalDataSource] = useState<IDataSourceTickets[]>([]);
  const [isShowModalCreateTicket, setIsShowModalCreateTicket] = useState<boolean>(false);
  const [isShowModalAssignTicket, setIsShowModalAssignTicket] = useState<boolean>(false);
  const [isShowModalCompleteTicket, setIsShowModalCompleteTicket] = useState<boolean>(false)
  const [isShowModalUnassignTicket, setIsShowModalUnassignTicket] = useState<boolean>(false);
  const [isShowModalInCompleteTicket, setIsShowModalInCompleteTicket] = useState<boolean>(false);
  const [userList, setUserList] = useState<IUser[]>([]);
  const [selectTicket, setSelectTicket] = useState<IDataSourceTickets | undefined>(undefined);
  const [searchText, setSearchText] = useState<string>("");
  const [isLoadingDataSource, setIsLoadingDataSource] = useState<boolean>(false);
  const getAllUser = () => {
    return from(methodGetService(GET_LIST_USER)).pipe(
      map(res => res?.data)
    );
  }

  const assigneeFilters = userList
    .filter(user => user.name !== undefined)
    .map(user => ({
      text: user.name as string,
      value: user.name as string
    }));


  const getTickets = () => {
    return from(methodGetService(GET_LIST_TICKET)).pipe(
      map(res => res?.data)
    );
  };

  const columns: TableProps<IColumnConfig>['columns'] = [
    {
      title: 'Order',
      dataIndex: 'order',
      key: 'order',
    },
    {
      title: 'Task Name',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Assignee Name',
      dataIndex: 'assigneeName',
      key: 'assigneeName',
      filters: assigneeFilters,
      filterSearch: true,
      onFilter: (value, record) => record.assigneeName === value,
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        let statusColor = "";
        if (status === StatusEnum.COMPLETED) {
          statusColor = "green"
        } else if (status === StatusEnum.ASSIGNED) {
          statusColor = "blue"
        } else {
          statusColor = "red"
        }
        return (
          <Tag color={statusColor} key={status} >
            {status.toUpperCase()}
          </Tag>
        );
      },
      filters: [
        {
          text: "Assigned",
          value: StatusEnum.ASSIGNED,
        },
        {
          text: "Unassigned",
          value: StatusEnum.UNASSIGNED,
        },
        {
          text: "Completed",
          value: StatusEnum.COMPLETED,
        },
      ],
      onFilter: (value, record) => record.status == value,
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (value) => <div className="flex items-center gap-4">
        {
          (value?.status === StatusEnum.UNASSIGNED || value?.status === StatusEnum.ASSIGNED) &&
          <Tooltip title="Assign ticket">
            <Button shape="circle" icon={<LuNotebookPen />} onClick={() => {
              setSelectTicket(value);
              setIsShowModalAssignTicket(true);
            }} />
          </Tooltip>
        }
        {
          value?.status === StatusEnum.ASSIGNED &&
          <Tooltip title="Complete ticket">
            <Button shape="circle" icon={<FaCheck />} onClick={() => {
              setSelectTicket(value)
              setIsShowModalCompleteTicket(true);
            }} />
          </Tooltip>
        }
        {
          value?.status === StatusEnum.ASSIGNED &&
          <Tooltip title="Unassign ticket">
            <Button shape="circle" icon={<FaUndo />} onClick={() => {
              setSelectTicket(value)
              setIsShowModalUnassignTicket(true);
            }} />
          </Tooltip>
        }
        {
          value?.status === StatusEnum.COMPLETED &&
          <Tooltip title="Incomplete ticket">
            <Button shape="circle" icon={<IoMdClose />} onClick={() => {
              setSelectTicket(value)
              setIsShowModalInCompleteTicket(true);
            }} />
          </Tooltip>
        }
      </div>,
    },
  ];

  const onFinish = () => {
    setSelectTicket(undefined);
    fetchTickets();
  }


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const findAssigneeName = (userList: any[], assigneeId: number): string => {
    const findUser = userList.find(item => item.id === assigneeId);
    if (findUser) {
      return findUser?.name
    }
    return "";
  }

  const mappingNameStatus = (isCompleted: boolean, assigneeId: number) => {

    if (isNullOrEmpty(assigneeId)) {
      return StatusEnum.UNASSIGNED
    }
    if (isCompleted) {
      return StatusEnum.COMPLETED
    } else {
      return StatusEnum.ASSIGNED
    }
  }

  const onSearchValue = (value: string) => {
    setSearchText(value);
    if (!value) {
      setDataSource(originalDataSource);
      return;
    }
    const searchValue = value.toString().toLowerCase();
    const filterDataSource = originalDataSource?.filter(res =>
      res?.fullTextSearch?.toLowerCase()?.includes(searchValue)
    );
    setDataSource(filterDataSource);
  }

  const fetchTickets = () => {
    setIsLoadingDataSource(true);
    return getTickets().pipe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      switchMap((resTicket: any) => {
        return getAllUser().pipe(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          tap((resUser: any) => {
            if (!isNullOrEmpty(resUser)) {
              setUserList(resUser)
            }
          }),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          map((resUser: any) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return resTicket.map((itemTicket: any, index: number) => {
              const assigneeName = itemTicket?.assigneeId ? findAssigneeName(resUser, itemTicket?.assigneeId) : "";
              const status = mappingNameStatus(itemTicket?.completed, itemTicket?.assigneeId)
              return {
                order: index,
                description: itemTicket?.description,
                id: itemTicket?.id,
                assigneeId: itemTicket?.assigneeId,
                completed: itemTicket?.completed,
                assigneeName: assigneeName,
                status: status,
                fullTextSearch: `${itemTicket?.description}_${assigneeName}_${status}`
              }
            })
          })
        )
      }),
      finalize(() => {
        setIsLoadingDataSource(false);
      })
    ).subscribe(res => {
      if (!isNullOrEmpty(res)) {
        setOriginalDataSource(res);
        setDataSource(res);
      }
    });

  }

  useEffect(() => {
    fetchTickets();
  }, []);

  const renderCountTab = useCallback(()=>{
    return   <div className="w-[68%] min-w-[300px] h-[150px] rounded-[20px] flex justify-between py-4 px-5 bg-white">
        <div className="flex flex-col w-full items-center gap-6 border-r-[1px] border-gray-200">
          <p className="text-2xl font-bold">Total</p>
          <p className="text-4xl">{dataSource.length}</p>
        </div>
        <div className="flex flex-col w-full items-center gap-6 border-r-[1px] border-gray-200">
          <p className="text-2xl font-bold text-blue-500">Assigned</p>
          <p className="text-4xl">{dataSource?.filter(res => res.status === StatusEnum.ASSIGNED)?.length}</p>
        </div>
        <div className="flex flex-col w-full items-center gap-6 border-r-[1px] border-gray-200">
          <p className="text-2xl font-bold text-red-500">Unassigned</p>
          <p className="text-4xl">{dataSource?.filter(res => res.status === StatusEnum.UNASSIGNED)?.length}</p>
        </div>
        <div className="flex flex-col w-full items-center gap-6">
          <p className="text-2xl font-bold text-green-500">Completed</p>
          <p className="text-4xl">{dataSource?.filter(res => res.status === StatusEnum.COMPLETED)?.length}</p>
        </div>
      </div>
  },[dataSource])

  return (<div className="flex flex-col w-full h-full gap-4">
    <div className="w-full flex items-center gap-4">
      <div className="w-[30%] min-w-[300px] h-[150px] bg-[url('/images/background_home.png')] bg-cover bg-center rounded-[20px] flex flex-col justify-between py-4 px-5">
        <p>Hi, Admin</p>
        <div className="w-[200px]">
          <PrimaryButtonComponent
            title="Create new ticket"
            onClickHandler={() => {
              setIsShowModalCreateTicket(true);
            }}
          />
        </div>
      </div>
      {renderCountTab()}
    
    </div>
    <div className="w-full flex gap-2 items-center">
      <div className="w-1/2">
        <FloatingLabelInputComponent
          // suffix={<CiSearch/>}
          value={searchText}
          label="Search"
          onChange={onSearchValue}
          className="px-[14px] py-[10px]"
        />
      </div>
      <Tooltip title="Refresh data">
        <Button shape="circle" icon={<IoIosRefresh />} onClick={() => {
          setSearchText("");
          fetchTickets();
        }} />
      </Tooltip>
    </div>

    <div className=" bg-white rounded-[20px] h-[300px]">
      <TableTicketList dataSource={dataSource} column={columns} isLoading={isLoadingDataSource} />
    </div>
    <div>
      {isShowModalCreateTicket && <CreateTicket isShowModal={isShowModalCreateTicket} setIsShowModal={setIsShowModalCreateTicket} onFinish={onFinish} />}
    </div>
    <div>
      {isShowModalAssignTicket && <AssignTicket
        isShowModal={isShowModalAssignTicket}
        setIsShowModal={setIsShowModalAssignTicket}
        onFinish={fetchTickets}
        ticketId={selectTicket?.id}
        userList={userList}
        initialUserId={selectTicket?.assigneeId}
      />}
    </div>
    <div>
      {isShowModalCompleteTicket && <CompleteTicket
        isShowModal={isShowModalCompleteTicket}
        setIsShowModal={setIsShowModalCompleteTicket}
        onFinish={onFinish} ticketId={selectTicket?.id}
        assignId={selectTicket?.assigneeId}
        titleTicket={selectTicket?.description}
      />}
    </div>
    <div>
      {isShowModalUnassignTicket && <UnassignTicket
        isShowModal={isShowModalUnassignTicket}
        setIsShowModal={setIsShowModalUnassignTicket}
        onFinish={onFinish} ticketId={selectTicket?.id}
        assignId={selectTicket?.assigneeId}
        titleTicket={selectTicket?.description}
        assigneeName={selectTicket?.assigneeName}
      />}
    </div>
    <div>
      {isShowModalInCompleteTicket && <InCompleteTicket
        isShowModal={isShowModalInCompleteTicket}
        setIsShowModal={setIsShowModalInCompleteTicket}
        onFinish={onFinish} ticketId={selectTicket?.id}
        assignId={selectTicket?.assigneeId}
        titleTicket={selectTicket?.description}
        assigneeName={selectTicket?.assigneeName}
      />}
    </div>
  </div>)
}
export default TicketList;
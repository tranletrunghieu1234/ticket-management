import { Outlet, useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import { Menu, Popover, type MenuProps } from 'antd';
import { IoTicketOutline } from "react-icons/io5";

type MenuItem = Required<MenuProps>['items'][number];

const LayoutWrapper = () => {
	const navigate = useNavigate();
	const items: MenuItem[] = [
		{
			key: 'sub1',
			label: 'Management',
			icon: <IoTicketOutline />,
			children: [
				{
					key: 'g1',
					type: 'group',
					children: [
						{ key: '1', label: 'Tickets' },
					],
				},
			],
		},
	];
	const contentUser = () => {
		return <div className='flex flex-col gap-2'>
			<div className='flex gap-1'>
				<p className='font-bold'>Username:</p>
				<p>Admin</p>
			</div>
			<div className='flex gap-1'>
				<p className='font-bold'>Role:</p>
				<p>SUPER_ADMIN</p>
			</div>

		</div>
	}

	const backToHome = () => {
		navigate('tickets');
	}
	return (
		<div className="bg-[#F1F5F9] h-screen w-full">
			<div className='flex w-full h-full'>
				<header className="h-full bg-white flex items-start px-4 header-information w-[18%] min-w-[280px] border-r-[1px] border-gray-200 pt-4 flex-col gap-4">
					<img src='/images/task-management-tips.webp' className='rounded-[20px] h-[70px] w-full object-contain' />
					<Menu
						onClick={() => {

						}}
						style={{ width: 256 }}
						defaultSelectedKeys={['1']}
						defaultOpenKeys={['sub1']}
						mode="inline"
						items={items}
					/>
				</header>
				<div className='flex flex-col w-[82%] h-full'>
					<header className="min-h-[60px] bg-white flex items-center justify-between px-4 header-information w-full border-b-[1px] border-gray-200">
						<p className='text-gray-500 text-xl cursor-pointer px-10' onClick={backToHome}>
							Ticket Managements
						</p>
						<Popover content={contentUser}>
							<FaRegUserCircle size={25} className='cursor-pointer' />
						</Popover>
					</header>
					<main className="py-4 px-10">
						<Outlet />
					</main>
				</div>
		

			</div>


		</div>
	);
};
export default LayoutWrapper;

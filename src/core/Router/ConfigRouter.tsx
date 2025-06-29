import { Navigate, type RouteObject } from 'react-router-dom';
import TicketList from '../../modules/private/tickets/TicketList';
import LayoutWrapper from '../LayoutWrapper/LayoutWrapper';



// Define routes as an object
const ConfigRouter: RouteObject[] = [
  {
    path: '/',
    element: <LayoutWrapper />,
    children: [
      { index: true, element: <Navigate to="/tickets" replace /> },
      { path: 'tickets', element: <TicketList /> },
      { path: '*', element: <Navigate to="/tickets" replace /> }

    ]
  }
];

export default ConfigRouter;
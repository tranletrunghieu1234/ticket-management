import { BrowserRouter, useRoutes } from "react-router-dom";
import ConfigRouter from "./core/Router/ConfigRouter";
import AuthWrapper from "./core/AuthWrapper/AuthWrapper";

function App() {
  const AppRoutes = () => {
    return useRoutes(ConfigRouter);
  };
  return (
    <>
    <AuthWrapper>
       <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthWrapper>
     
    </>
  )
}

export default App

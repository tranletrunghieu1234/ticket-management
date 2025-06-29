import { useEffect, type ReactNode } from "react";

const AuthWrapper = ({ children }: { children: ReactNode }) =>{
    useEffect(()=>{
    },[])
    return <>{children}</>
}
export default AuthWrapper;
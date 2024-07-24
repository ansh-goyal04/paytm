import { useEffect, useState } from "react"
import  Appbar from "../components/Appbar"
import Balance from "../components/Balance"
import Users from "../components/Users"
import axios from "axios"

export default function Dashboard(){
    const [account,setAccount]=useState({});
    useEffect(()=>{
        async function func(){
            const response=await axios.get("http:localhost:3000/api/v1/user/existingUser");
            const account=response.data;
            setAccount(account);
        }
        func();
    },[]);
    
    return <div>
    <Appbar />
    <div className="m-8">
        <Balance value={account.balance} />
        <Users />
    </div>
</div>
}
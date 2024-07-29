import { useEffect, useState } from "react"
import  Appbar from "../components/Appbar"
import Balance from "../components/Balance"
import Users from "../components/Users"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Dashboard(){
    const navigate=useNavigate();
    const [balance,setBalance]=useState(0);
    const [user,setUser]=useState("");
    useEffect(()=>{
        async function func(){
            const response=await axios.get("http://localhost:3000/api/v1/account/balance",{
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            setBalance(response.data.balance);
            setUser(response.data.user.firstName);

        }
        func();
    },[balance]);
    return <div>
    <Appbar onClick={async()=>{
        const response=await axios.get("http://localhost:3000/api/v1/user/signout");
        localStorage.removeItem("token");
        navigate("/signin");
    }} label={"signout"} user={user}/>
        
    <div className="m-8">
        <Balance value={balance} />
        <Users />
    </div>
</div>
}

import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card"
import { useAuth } from "@/context/authContext";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../layouts/header";

export const Home = () => {
    const { isLoggedIn,setLoggedIn } = useAuth();
    setLoggedIn(true);
    const navigate = useNavigate();
    return (
        <div className="min-h-screen ">
            <Navbar />
            <main className="">
                <div className="border-red-400"></div>
            </main>
        </div>
    )
}
import { useAuth } from "@/context/authContext"
import { useNavigate } from "react-router-dom"
import { Ghost, LogOut } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "../ui/button";

export const Navbar = () => {
  const { isLoggedIn,setLoggedIn } = useAuth();
    setLoggedIn(false);
    const navigate = useNavigate();
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate('/auth');
    }
    const handleLogout = ()=>{
      navigate('/auth');
    }
  return (
    <header className="">
    <div className="flex justify-between items-center p-5">
        <h2 className="text-2xl font-bold p-5 ">CNotes</h2>
        <nav>
            {!isLoggedIn ? (
                <>
                    <Button variant="ghost" className="mr-3" onClick={handleClick}>Signup</Button>
                    <Button onClick={handleClick}>Login</Button>
                </>
            ) : (<div className="mr-8">
            <DropdownMenu>
<DropdownMenuTrigger><Avatar>
<AvatarImage src="https://github.com/shadcn.png" />
<AvatarFallback>CN</AvatarFallback>
</Avatar>
</DropdownMenuTrigger>
<DropdownMenuContent>
<DropdownMenuLabel>My Account</DropdownMenuLabel>
<DropdownMenuSeparator />
<DropdownMenuItem>Profile</DropdownMenuItem>
<DropdownMenuItem>My Groups</DropdownMenuItem>
<DropdownMenuItem className="text-red-500" onClick={handleLogout}><LogOut/>Logout</DropdownMenuItem>
</DropdownMenuContent>
</DropdownMenu>
</div>)}
        </nav>
    </div>
</header>
  );
};
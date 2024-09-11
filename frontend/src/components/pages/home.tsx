import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { useAuth } from "@/context/authContext";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../layouts/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
export const Home = () => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [createData,setCreateData] = useState({
        name:"",
        password:""
    })
    const handleCreate=async (e:React.FormEvent)=>{
        e.preventDefault();
        try{
        const response = await fetch("http://localhost:3000/api/group/create",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(createData)
        })
        if(response.ok){
            const data = await response.json();
            const groupId = data.id;
            navigate(`/group/${groupId}`)
        }else{
            console.log("Error creating group");
        }
    }catch(err){
        console.error(`Error: ${err}`);
    }
    }
    
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main>
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="font-bold text-2xl mb-8">One stop solution for organized notes</h2>
                    </div>
                    <div className="flex flex-col items-center">
                        <Tabs defaultValue="create" className="w-full max-w-lg">
                            <TabsList className="flex space-x-4 border-b border-gray-300">
                                <TabsTrigger
                                    value="create"
                                    className="px-4 py-2 text-sm font-medium text-gray-700"
                                >
                                    Create Group
                                </TabsTrigger>
                                <TabsTrigger
                                    value="join"
                                    className="px-4 py-2 text-sm font-medium text-gray-700"
                                >
                                    Join Group
                                </TabsTrigger>
                            </TabsList>
                            <div className="w-full mt-4">
                                <TabsContent value="create">
                                    {/* Create Group Form */}
                                    <form className="space-y-4 p-4 bg-white shadow rounded">
                                        <div>
                                            <label htmlFor="groupName" className="block text-sm font-medium text-gray-700">Group Name</label>
                                            <input
                                                id="groupName"
                                                type="text"
                                                placeholder="Enter group name"
                                                onChange={(e)=>setCreateData({...createData,name:e.target.value})}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
                                            />
                                            <input
                                                id="password"
                                                type="text"
                                                onChange={(e)=>setCreateData({...createData,password:e.target.value})}
                                                placeholder="Enter the password"
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
                                            />
                                        </div>
                                        <Button type="submit" className="w-full" onClick={handleCreate}>Create</Button>
                                    </form>
                                </TabsContent>
                                <TabsContent value="join">
                                    {/* Join Group Form */}
                                    <form className="space-y-4 p-4 bg-white shadow rounded">
                                        <div>
                                            <label htmlFor="groupId" className="block text-sm font-medium text-gray-700">Group ID</label>
                                            <input
                                                id="groupId"
                                                type="text"
                                                placeholder="Enter group ID"
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                            <input
                                                id="password"
                                                type="password"
                                                placeholder="Enter password"
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
                                            />
                                        </div>
                                        <Button type="submit" className="w-full">Join</Button>
                                    </form>
                                </TabsContent>
                            </div>
                        </Tabs>
                    </div>
                    <div className="flex flex-col items-center mt-20">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            <Card>
                                <CardContent>
                                    <CardTitle className="flex items-center">Notes</CardTitle>
                                    <CardDescription>Organize your notes in one place</CardDescription>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent>
                                    <CardTitle className="flex items-center">Groups</CardTitle>
                                    <CardDescription>Collaborate with your friends in groups</CardDescription>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent>
                                    <CardTitle className="flex items-center">Tags</CardTitle>
                                    <CardDescription>Tag your notes for easy access</CardDescription>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

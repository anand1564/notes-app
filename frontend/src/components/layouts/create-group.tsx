import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button";
export const CreateGroup = () => {
    const navigate = useNavigate();
    const [createData, setCreateData] = useState({
        name: "",
        password: ""
    });
    const [joinData, setJoinData] = useState({
        group_id: "",
        password: ""
    });

    const handleJoin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/group/join", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(joinData)
            });
            if (response.ok) {
                const data = await response.json();
                const groupId: string = data.group.id;
                navigate(`/group/${groupId}`);
            } else {
                console.log("Error joining group");
            }
        } catch (err) {
            console.error(`Error: ${err}`);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/group/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(createData)
            });
            if (response.ok) {
                const data = await response.json();
                const groupId = data.group.id;
                navigate(`/group/${groupId}`);
            } else {
                console.log("Error creating group");
            }
        } catch (err) {
            console.error(`Error: ${err}`);
        }
    };

    return (
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
                            <form className="space-y-4 p-4 bg-white shadow rounded" onSubmit={handleCreate}>
                                <div>
                                    <label htmlFor="groupName" className="block text-sm font-medium text-gray-700">Group Name</label>
                                    <input
                                        id="groupName"
                                        type="text"
                                        placeholder="Enter group name"
                                        onChange={(e) => setCreateData({ ...createData, name: e.target.value })}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
                                    />
                                    <input
                                        id="password"
                                        type="text"
                                        onChange={(e) => setCreateData({ ...createData, password: e.target.value })}
                                        placeholder="Enter the password"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
                                    />
                                </div>
                                <Button type="submit" className="w-full">Create</Button>
                            </form>
                        </TabsContent>
                        <TabsContent value="join">
                            <form className="space-y-4 p-4 bg-white shadow rounded" onSubmit={handleJoin}>
                                <div>
                                    <label htmlFor="groupId" className="block text-sm font-medium text-gray-700">Group ID</label>
                                    <input
                                        id="groupId"
                                        type="text"
                                        placeholder="Enter group ID"
                                        onChange={(e) => setJoinData({ ...joinData, group_id: e.target.value })}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                    <input
                                        id="password"
                                        type="password"
                                        placeholder="Enter password"
                                        onChange={(e) => setJoinData({ ...joinData, password: e.target.value })}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
                                    />
                                </div>
                                <Button type="submit" className="w-full">Join</Button>
                            </form>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </div>
    );
};

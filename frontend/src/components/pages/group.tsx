import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, FileText, Plus, Upload } from 'lucide-react';
import { useParams } from 'react-router-dom';

interface Subject {
  id: string;
  name: string;
  group_id: string;
}

const BatchDashboard = () => {
  const { group_id } = useParams<{ group_id: string }>();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [newSubject, setNewSubject] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      if (group_id) {
        try {
          const response = await fetch(`http://localhost:3000/api/subject/${group_id}/get`);
          if (response.ok) {
            const data: Subject[] = await response.json();
            setSubjects(data);
          } else {
            console.error('Error fetching subjects');
          }
        } catch (err) {
          console.error(`Error: ${err}`);
        }
      }
    };

    fetchSubjects();
  }, [group_id]);

  const handleAddSubject = async () => {
    if (newSubject.trim() !== '' && group_id) {
      try {
        const response = await fetch(`http://localhost:3000/api/subject/${group_id}/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name: newSubject.trim(), group_id })
        });

        if (response.ok) {
          const newSubjectData: Subject = await response.json();
          setSubjects([...subjects, newSubjectData]);
          setNewSubject('');
        } else {
          console.log("Error creating subject");
        }
      } catch (err) {
        console.error(`Error: ${err}`);
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('File uploaded:', event.target.files?.[0]);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Subjects</h2>
          <ScrollArea className="h-[calc(100vh-200px)]">
            {subjects.map((subject) => (
              <Button
                key={subject.id}
                variant={selectedSubject === subject ? "secondary" : "ghost"}
                className="w-full justify-start mb-2"
                onClick={() => setSelectedSubject(subject)}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                {subject.name}
              </Button>
            ))}
          </ScrollArea>
          <div className="mt-4">
            <Input
              placeholder="New subject"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              className="mb-2"
            />
            <Button onClick={handleAddSubject} className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Add Subject
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Batch Dashboard</h1>
        
        {selectedSubject ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4">{selectedSubject.name}</h2>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="mr-2" /> Upload Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.txt"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2" /> Uploaded Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>No notes uploaded yet.</p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <p className="text-gray-500">Select a subject from the sidebar to view and upload notes.</p>
        )}
      </main>
    </div>
  );
};

export default BatchDashboard;

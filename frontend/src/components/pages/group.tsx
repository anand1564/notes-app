import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen,  Plus } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Textarea } from '../ui/textarea';

interface Subject {
  id: string;
  name: string;
  group_id: string;
}

interface Note {
  id: string;
  title: string;
  description: string;
  pdf: string;
  subject_id: string;
}

const BatchDashboard: React.FC = () => {
  const { group_id } = useParams<{ group_id: string }>();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [newSubject, setNewSubject] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [newNote, setNewNote] = useState({
    title: "",
    description: "",
    pdf: ""
  });

  const fetchWithTimeout = async (url: string, options: RequestInit, timeout: number) => {
    return Promise.race([
      fetch(url, options),
      new Promise<Response>((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), timeout)
      )
    ]);
  };
  useEffect(() => {
    if (selectedSubject) {
      fetchNotes(selectedSubject.id);
    }
  }, [selectedSubject]);
  
  const fetchNotes = async (subjectId: string) => {
    try {
      console.log(`Fetching notes for subject: ${subjectId}`);
      const response = await fetchWithTimeout(`http://localhost:3000/api/notes/${group_id}/${subjectId}/get`, {}, 30000); // 10 seconds timeout
  
      if (response.ok) {
        const data: Note[] = await response.json();
        console.log("Fetched Notes: ", data);
        setNotes(data);
      } else {
        const errorText = await response.text();
        console.error(`Error fetching notes: ${errorText}`);
        setError(`Failed to fetch notes: ${errorText}`);
      }
    } catch (err) {
      console.error(`Error fetching notes: ${err}`);
      setError(`Failed to fetch notes: ${err}`);
    }
  };
  

  const fetchSubjects = async () => {
    if (group_id) {
      try {
        console.log(`Fetching subjects for group: ${group_id}`);
        const response = await fetch(`http://localhost:3000/api/subject/${group_id}/get`);
        if (response.ok) {
          const data: Subject[] = await response.json();
          console.log('Fetched subjects:', data);
          setSubjects(data);
        } else {
          const errorText = await response.text();
          console.error('Error fetching subjects:', errorText);
          setError(`Failed to fetch subjects: ${errorText}`);
        }
      } catch (err) {
        console.error(`Error fetching subjects: ${err}`);
        setError(`Failed to fetch subjects: ${err}`);
      }
    } else {
      console.log("Group Id is not valid");
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, [group_id]);

  const handleAddNote = async () => {
    if (newNote.title.trim() !== "" && newNote.description.trim() !== "" && selectedSubject && selectedFile) {
      try {
        const formData = new FormData();
        formData.append('title', newNote.title);
        formData.append('description', newNote.description);
        formData.append('pdf', selectedFile); // Ensure this name matches 'pdf'
  
        const response = await fetch(`http://localhost:3000/api/notes/${group_id}/${selectedSubject.id}/create`, {
          method: "POST",
          body: formData
        });
  
        if (response.ok) {
          window.alert("New notes added, please refresh.");
          const newNoteData = await response.json();
          console.log('New note added:', newNoteData);
          setNotes(prevNotes => [...prevNotes, newNoteData]);
          setNewNote({ title: "", description: "", pdf: "" }); // Reset the note
          setSelectedFile(null); // Reset the file
          setError(null);
        } else {
          const errorText = await response.text();
          console.error(`Error creating note: ${errorText}`);
          setError(`Failed to create note: ${errorText}`);
        }
      } catch (error) {
        console.error(`Error creating note: ${error}`);
        setError(`Failed to create note: ${error}`);
      }
    } else {
      setError('Please fill all fields and upload a file.');
    }
  };
  
  

  const handleAddSubject = async () => {
    if (newSubject.trim() !== '' && group_id) {
      try {
        console.log(`Adding new subject "${newSubject}" to group: ${group_id}`);
        const response = await fetch(`http://localhost:3000/api/subject/${group_id}/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name: newSubject.trim() })
        });

        if (response.ok) {
          const newSubjectData: Subject = await response.json();
          console.log('New subject added:', newSubjectData);
          setSubjects(prevSubjects => [...prevSubjects, newSubjectData]);
          setNewSubject('');
          setError(null);
        } else {
          const errorText = await response.text();
          console.error("Error creating subject:", errorText);
          setError(`Failed to create subject: ${errorText}`);
        }
      } catch (err) {
        console.error(`Error creating subject: ${err}`);
        setError(`Failed to create subject: ${err}`);
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file); // Save the file in state
      setNewNote(prev => ({ ...prev, pdf: file.name })); // Update the note state if needed
    }
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
                variant={selectedSubject?.id === subject.id ? "secondary" : "ghost"}
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

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {selectedSubject ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4">{selectedSubject.name}</h2>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="mr-2" /> Add New Note
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Note Title"
                  value={newNote.title}
                  onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
                  className="mb-2"
                />
                <Textarea
                  placeholder="Note Description"
                  value={newNote.description}
                  onChange={(e) => setNewNote(prev => ({ ...prev, description: e.target.value }))}
                  className="mb-2"
                />
                <Input
                  type="file"
                  name="pdf"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.txt"
                  className="mb-2"
                />
                <Button onClick={handleAddNote}>Add Note</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                {notes.length > 0 ? (
                  <ul>
                    {notes.map((note) => (
                      <li key={note.id} className="mb-2">
                        <h3 className="font-bold">{note.title}</h3>
                        <p>{note.description}</p>
                        {note.pdf && (
                          <a href={`http://localhost:3000/uploads/${note.pdf}`} target="_blank" rel="noopener noreferrer">
                            View PDF
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No notes available for this subject.</p>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <p>Select a subject to view or add notes.</p>
        )}
      </main>
    </div>
  );
};

export default BatchDashboard;

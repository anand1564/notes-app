import React, { FormEventHandler, ReactElement, useState } from "react";

function UploadNotes() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedFilePath, setUploadedFilePath] = useState("");

  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
     if (e.target.files && e.target.files.length > 0) {
          setFile(e.target.files[0]);
        }
  };

  const handleUpload = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return alert("Please select a file!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:3000/notes/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setUploadedFilePath(data.filePath);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <h1>Upload Notes</h1>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {uploadedFilePath && (
        <div>
          <h3>Uploaded File:</h3>
          <a href={`http://localhost:3000${uploadedFilePath}`} target="_blank" rel="noopener noreferrer">
            View Notes
          </a>
        </div>
      )}
    </div>
  );
}

export default UploadNotes;

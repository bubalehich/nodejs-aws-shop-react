import React from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const [file, setFile] = React.useState<File>();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const removeFile = () => {
    setFile(undefined);
  };

  const uploadFile = async () => {
    if (!file) return;

    const authorizationToken = localStorage.getItem("authorization_token");

    try {
      console.log("Requesting signed URL for", file.name);
      const response = await axios.get<string>(url, {
        params: { name: encodeURIComponent(file.name) },
        headers: authorizationToken
          ? { Authorization: `Basic ${authorizationToken}` }
          : undefined,
      });

      console.log("Uploading to", response.data);
      const result = await fetch(response.data, {
        method: "PUT",
        body: file,
      });
      console.log("Upload result:", result.status);

      setFile(undefined);
    } catch (error) {
      const status = axios.isAxiosError(error) ? error.response?.status : undefined;
      if (status === 401) {
        alert("401 Unauthorized — no authorization token provided.");
      } else if (status === 403) {
        alert("403 Forbidden — invalid authorization token.");
      } else {
        alert(`Upload failed: ${status ?? "unknown error"}`);
      }
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </Box>
  );
}

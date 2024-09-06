"use client";

import { useEffect, useState } from "react";
import Update from "../ui/Update";

export default function Page() {
  const [files, setFiles] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      let data = await fetch("http://localhost:3000/api/getfiles", {
        method: "GET",
      });
      let jsonData = await data.json();
      console.log("🚀 ~ Page ~ posts:", jsonData.data);
      const files = jsonData.data;
      setFiles(files);
      setReload(false);
    };
    fetchData();

    return () => {};
  }, [reload]);

  const deleteFile = async (id: string) => {
    console.log(id);
    let resp = await fetch(`http://localhost:3000/api/deletefile?key=${id}`, {
      method: "DELETE",
    });
    const jsonResp = await resp.json();
    console.log("🚀 ~ deleteFile ~ jsonResp:", jsonResp);
    setReload(true);
  };
  return (
    <ul>
      {" "}
      {files.map((file: { Key: string }) => (
        <>
          {" "}
          <li key={file.Key}>
            {file.Key}{" "}
            <button onClick={() => deleteFile(file.Key)}>Delete</button>
            <Update filekey={file.Key} />
          </li>
        </>
      ))}
    </ul>
  );
}

import { useState } from "react";

const Update = ({ filekey }: { filekey: string }) => {

  const [file, setFile] = useState<File>();
  const submitFile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      return;
    }
    try {
      const form = new FormData();
      form.set("file", file);
      form.set("filekey", filekey);
      const res = await fetch("api/fileupload", {
        method: "PUT",
        body: form,
      });
      if (!res.ok) throw new Error(await res.text());
      console.log("🚀 ~ submitFile ~ res from frontend:", await res.json());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {" "}
      <form onSubmit={submitFile}>
        Update File
        <input type="file" onChange={(e) => setFile(e.target.files?.[0])} />
        <input type="submit" value="Upload" />
      </form>
    </div>
  );
};

export default Update;

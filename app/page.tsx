import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div>
      My page
      <Image
        width={200}
        height={250}
        src="https://pub-b53202eb4b434961a589daddb8a6bac9.r2.dev/sitecore-xm-cloud-developer-certification-2023.png"
        alt=""
      />
    </div>
  );
};

export default page;
 
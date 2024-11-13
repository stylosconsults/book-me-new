import React from "react";

import Image from "next/image";


export default function Illustration() {
  return (
      <Image
        src="/static/images/other/404.svg"
        height={1000}
        width={1000}
        className="w-9/12 lg:w-8/12"
        alt="404"
      />
  );
}

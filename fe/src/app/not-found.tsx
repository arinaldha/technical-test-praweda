import { Result } from "antd";
import React from "react";

export default function NotFound() {
  return (
    <div>
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you dont have permission to access this page."
      />
    </div>
  );
}

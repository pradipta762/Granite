import React from "react";

import Header from "./Header";
import Row from "./Row";

const Table = ({ data, showTask, destroyTask }) => (
  <div className="inline-block min-w-full">
    <table className="min-w-full border-collapse border border-gray-300">
      <Header />
      <Row data={data} {...{ showTask, destroyTask }} />
    </table>
  </div>
);

export default Table;

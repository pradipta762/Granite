import React, { useState } from "react";

import tasksApi from "apis/tasks";
import { Container, PageTitle } from "components/commons";
import Logger from "js-logger";

import Form from "./Form";

const Create = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await tasksApi.create({ title });
      setLoading(false);
      history.pushState("/dashboard");
    } catch (error) {
      Logger.error(error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <PageTitle title="Add new task" />
        <Form {...{ handleSubmit, loading, setTitle }} />
      </div>
    </Container>
  );
};

export default Create;

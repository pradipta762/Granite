import React, { useEffect, useState } from "react";

import tasksApi from "apis/tasks";
import { Container, PageTitle, PageLoader } from "components/commons";
import Logger from "js-logger";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import Form from "./Form";

const EditTask = ({ history }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { slug } = useParams();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await tasksApi.update({
        slug,
        payload: { title },
      });
      setLoading(false);
      history.push("/dashboard");
    } catch (error) {
      setLoading(false);
      Logger.error(error);
    }
  };

  const fetchTaskDetails = async () => {
    try {
      const {
        data: {
          task: { title },
        },
      } = await tasksApi.show(slug);
      setTitle(title);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, []);

  if (pageLoading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <PageTitle title="Edit task" />
        <Form {...{ handleSubmit, loading, setTitle, title }} type="update" />
      </div>
    </Container>
  );
};

export default EditTask;

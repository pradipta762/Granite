import React, { useEffect, useState } from "react";

import tasksApi from "apis/tasks";
import { PageLoader, PageTitle, Container } from "components/commons";
import Table from "components/Tasks/Table";
import Logger from "js-logger";
import { isNil, isEmpty, either } from "ramda";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const fetchTasks = async () => {
    try {
      const {
        data: { tasks },
      } = await tasksApi.fetch();
      setTasks(tasks);
      setLoading(false);
    } catch (error) {
      Logger.error(error);
      setLoading(false);
    }
  };

  const showTask = slug => {
    history.push(`/tasks/${slug}/show`);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  if (either(isNil, isEmpty)(tasks)) {
    return (
      <Container>
        <h1 className="my-5 text-center text-xl leading-5">
          You have not created or been assigned any tasks 🥳
        </h1>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <PageTitle title="Todo list" />
        <Table data={tasks} {...{ showTask }} />
      </div>
    </Container>
  );
};

export default Dashboard;

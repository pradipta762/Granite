import axios from "axios";

const fetch = () => axios.get("/tasks");

const create = payload => axios.post("/tasks", { task: payload });

const show = slug => axios.get(`/tasks/${slug}`);

const update = ({ slug, payload, quiet = false }) => {
  const path = quiet ? `/tasks/${slug}?quiet` : `/tasks/${slug}`;

  return axios.put(path, {
    task: payload,
  });
};

const destroy = ({ slug, quiet }) => {
  const path = quiet ? `/tasks/${slug}?quiet` : `/tasks/${slug}`;

  return axios.delete(path);
};

const tasksApi = { fetch, create, show, update, destroy };

export default tasksApi;

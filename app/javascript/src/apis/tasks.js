import axios from "axios";

const fetch = () => axios.get("/tasks");

const create = payload => axios.post("/tasks", { task: payload });

const show = slug => axios.get(`/tasks/${slug}`);

const update = ({ slug, payload }) =>
  axios.put(`/tasks/${slug}`, {
    task: payload,
  });

const tasksApi = { fetch, create, show, update };

export default tasksApi;

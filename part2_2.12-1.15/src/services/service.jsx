import axios from "axios";
import Person from "../components/Person";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl).catch((error) => {
    console.error(error);
  });
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject).catch((error) => {
    console.error("Error creating person:", error);
    throw error;
  });
  return request.then((response) => response.data);
};

export default { getAll, create };

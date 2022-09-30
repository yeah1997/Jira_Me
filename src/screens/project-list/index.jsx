import List from "./list";
import { SearchPanel } from "./search-panel";
import { useEffect, useState } from "react";
import qs from "qs";
import { cleanObject } from "./utils";

const API_Url = "http://localhost:3001";

const ProjectList = () => {
  const [users, setUsers] = useState([]);

  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const [list, setList] = useState([]);

  useEffect(() => {
    //  fetch
    console.log("213");
    fetch(`${API_Url}/projects?${qs.stringify(cleanObject(param))}`).then(
      async (res) => {
        if (res.ok) {
          const arr = await res.json();
          setList(arr);
        }
      }
    );
  }, [param]);

  useEffect(() => {
    fetch(`${API_Url}/users`).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json());
      }
    });
  }, []);

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />

      <List list={list} users={users} />
    </div>
  );
};

export default ProjectList;

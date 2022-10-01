import List from "./list";
import { SearchPanel } from "./search-panel";
import { useEffect, useState } from "react";
import qs from "qs";
import { cleanObject } from "./utils";
import { useDebounce } from "./utils";

import { useMount } from "./utils";

const API_Url = "http://localhost:3001";

//静态代码查找类型错误-Typescript

const ProjectList = () => {
  const [users, setUsers] = useState([]);

  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const debounceParam = useDebounce(param, 200);

  const [list, setList] = useState([]);

  useEffect(() => {
    //  fetch
    fetch(
      `${API_Url}/projects?${qs.stringify(cleanObject(debounceParam))}`
    ).then(async (res) => {
      if (res.ok) {
        const arr = await res.json();
        setList(arr);
      }
    });
  }, [debounceParam]);

  useMount(() => {
    fetch(`${API_Url}/users`).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json());
      }
    });
  });

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />

      <List list={list} users={users} />
    </div>
  );
};

export default ProjectList;

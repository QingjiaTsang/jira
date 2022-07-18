import { useEffect, useState } from "react";
import { cleanObj, useDebounce, useMount } from "utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import qs from "qs";
import { useHttp } from "utils/http";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [searchParam, setSearchParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [listData, setListData] = useState([]);
  const debouncedParam = useDebounce(searchParam, 1000);
  const client = useHttp();

  useEffect(() => {
    client("projects", { searchParam: cleanObj(debouncedParam) }).then(
      setListData
    );
    // fetch(`${apiUrl}/projects?${qs.stringify(cleanObj(debouncedParam))}`).then(
    //   async (response) => {
    //     if (response.ok) {
    //       setListData(await response.json());
    //     }
    //   }
    // );
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
    // fetch(`${apiUrl}/users`).then(async (response) => {
    //   console.log("response.ok", response.ok);
    //   if (response.ok) {
    //     setUsers(await response.json());
    //   }
    // });
  });

  return (
    <div>
      <SearchPanel
        searchParam={searchParam}
        setSearchParam={setSearchParam}
        users={users}
      />
      {/* List的入参是查询到的列表结果 */}
      <List listData={listData} users={users} />
    </div>
  );
};

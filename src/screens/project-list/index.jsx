import { useEffect, useState } from "react"
import { cleanObj } from "utils"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import qs from "qs"

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [searchParam, setSearchParam] = useState({
      name: '',
      personId: ''
    });
  const [users, setUsers] = useState()
  const [listData, setListData] = useState()

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObj(searchParam))}`)
    .then(async response => {
      if (response.ok) {
        setListData(await response.json())
      }
    })

  }, [searchParam])

  useEffect(() => {
    fetch(`${apiUrl}/users`)
    .then(async response => {
      console.log('response.ok',response.ok);
      if (response.ok) {
        setUsers(await response.json());
      }
    })
  }, []);

  // console.log('users',users)



  return (
      <div>
          <SearchPanel
            searchParam={searchParam}
            setSearchParam={setSearchParam}
            users={users}
            setUsers={setUsers}/>
          {/* List的入参是查询到的列表结果 */}
          <List listData={listData} users={users} />
      </div>
  )
}
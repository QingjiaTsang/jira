import { Table } from "antd";
import { User } from "./search-panel";

interface Project {
  id: string;
  name: string;
  personId: string;
  organization: string;
  created: string;
}

interface ListProps {
  listData: Project[];
  users: User[];
}

export const List = ({ listData, users }: ListProps) => {
  const columns = [
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "负责人",
      dataIndex: "manerger",
      key: "manerger",
      render: (value: any, project: Project) => {
        return (
          <span>
            {users?.find((user) => user.id === project.personId)?.name}
          </span>
        );
      },
    },
  ];
  return <Table pagination={false} columns={columns} dataSource={listData} />;

  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {listData?.map((it) => {
          const userName = users?.find((user) => user.id === it.personId)?.name;
          return (
            <tr key={it.id}>
              <td>{it.name}</td>
              <td>{userName}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

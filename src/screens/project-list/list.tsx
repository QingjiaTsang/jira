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

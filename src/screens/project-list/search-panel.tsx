import { Select, Input, Form } from "antd";
export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchParamProps {
  searchParam: {
    name: string;
    personId: string;
  };
  setSearchParam: (searchParam: SearchParamProps["searchParam"]) => void;
  users?: User[];
}

export const SearchPanel = ({
  searchParam,
  setSearchParam,
  users,
}: SearchParamProps) => {
  // 思考清楚状态管理，不同组件间的通信
  // 这个组件涉及到了【状态提升】
  return (
    <Form>
      <Input
        type="text"
        value={searchParam.name}
        onChange={(e) =>
          setSearchParam({
            ...searchParam,
            name: e.target.value,
          })
        }
      />

      <Select
        value={searchParam.personId}
        onChange={(value) => {
          setSearchParam({
            ...searchParam,
            personId: value,
          });
        }}
      >
        <Select.Option value="">负责人</Select.Option>
        {users?.map((it) => (
          <Select.Option value={it.id} key={it.id}>
            {it.name}
          </Select.Option>
        ))}
      </Select>
    </Form>
  );
};

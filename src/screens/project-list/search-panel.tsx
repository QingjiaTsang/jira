export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
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
    <form>
      <div>
        <input
          type="text"
          value={searchParam.name}
          onChange={(e) =>
            setSearchParam({
              ...searchParam,
              name: e.target.value,
            })
          }
        />

        <select
          value={searchParam.personId}
          onChange={(e) => {
            setSearchParam({
              ...searchParam,
              personId: e.target.value,
            });
          }}
        >
          <option value="">负责人</option>
          {users?.map((it) => (
            <option value={it.id} key={it.id}>
              {it.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

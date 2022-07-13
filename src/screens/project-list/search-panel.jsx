export const SearchPanel = ({searchParam,setSearchParam,users}) => {
  // 思考清楚状态管理，不同组件间的通信
  // 这个组件涉及到了【状态提升】
  


  return (
    <form>
      <div>
        <input type="text" value={searchParam.name} onChange={(e) => setSearchParam({
          ...searchParam,
          name: e.target.value,
        })}/>

        <select value={searchParam.id} onChange={(e) => {setSearchParam({
          ...searchParam,
          personId: e.target.value,
        })}}>
          <option value="">负责人</option>
          {users?.map((it) => <option value={it.id} key={it.id}>{it.name}</option>)}
        </select>
      </div>
    </form>
  )
}
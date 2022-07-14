import { useArray, useMount } from "utils";

export const TsReactTest = () => {
  const persons: { name: string; age: number }[] = [
    { name: "jack", age: 25 },
    { name: "ma", age: 22 },
  ];

  const { value, clear, removeIndx, add } = useArray(persons);

  console.log(value);

  useMount(() => {
    //报错&类型限制
    // console.log(value.aaa);
    // add({name: 'david'});
    // removeIndx('123');
  });
  return (
    <div>
      <button onClick={() => add({ name: "john", age: 22 })}>add john</button>
      <button onClick={() => removeIndx(0)}>remove 0</button>
      <button style={{ marginBottom: "50px" }} onClick={() => clear()}>
        clear
      </button>
      {value.map((person: { age: number; name: string }, index: number) => {
        return (
          <div style={{ marginBottom: "30px" }} key={index}>
            <span style={{ color: "red" }}>{index}</span>
            <span>{person.name}</span>
            <span>{person.age}</span>
          </div>
        );
      })}
    </div>
  );
};

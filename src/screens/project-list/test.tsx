import { useArray } from '../../utils/index'
export interface Person {
  name: string,
  age: number
}
const person: Person[] = [{
  name: 'jack',
  age: 26
}, {
  name: 'ma',
  age: 25
}]
export function TestCmp() {
  const { value, clear, removeIndex, add } = useArray(person)
  return <div>
    <button onClick={() => add({name: 'john', age: 22})}>add</button>
    <button onClick={() => removeIndex(0)}>remove0</button>
    <button onClick={() => clear()}>clear</button>
    {
      value.map((item, index) => {
        return <p key={index}>
          {index}{item.name}{item.age}
        </p>
      })
    }
  </div>
}
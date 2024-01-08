interface IProps {
    name:string,
    fn: (v:string)=>void
}

export const Test = ({name, fn}:IProps) => {
  return (
    <div>
        <div>{name}</div>
        <button onClick={()=>fn('si')}>click</button>
    </div>
  )
}

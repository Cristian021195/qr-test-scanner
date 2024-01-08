interface IProps {
    width:number,
    height:number
}
export const Corners = ({width, height}:IProps) => {
  return (
    <div className="box" style={{width, height}}>
    </div>
  )
}

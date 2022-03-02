import LinesEllipsis from "react-lines-ellipsis";


export const EllipseText = ({text}: {text: string}) => {
    return  <LinesEllipsis
      text={text}
      maxLine='2'
      ellipsis='...'
      component='div'
      basedOn='letters'
    />
}
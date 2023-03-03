import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`
  .slick-prev:before,
.slick-next:before {
  color: ${props => (props.isDark ? 'white' : 'black')};
}
`
export default GlobalStyle

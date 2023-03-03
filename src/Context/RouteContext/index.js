import React from 'react'

const RouteContext = React.createContext({
  searchCaption: '',
  isDarkMode: false,
  onChangeSearchCaption: () => {},
  onChangeDarkMode: () => {},
})

export default RouteContext

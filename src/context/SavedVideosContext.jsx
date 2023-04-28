import React from 'react'

const SavedVideosContext = React.createContext({
  SavedVideos: [],
  isDarkTheme: false,
  addToSavedVideos: () => {},
  removeSavedVideos: () => {},
  changeCurrentTheme: () => {},
})

export default SavedVideosContext

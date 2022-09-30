import { createSlice } from '@reduxjs/toolkit'
import { merge } from 'lodash'
import getDictionaries from './index'

const i18nSlice = createSlice({
  name: 'i18n',
  initialState: { setLanguage: {}, setDictionary: {}, dictionaries: getDictionaries() },
  reducers: {
    setLanguage: (state, action) => {
      const { language, dictionaries } = action.payload
      if (state.setLanguage !== language) {
        return Object.assign({}, state, {
          setLanguage: language,
          setDictionary: dictionaries[language]
        })
      }
      return state
    },
    addDictionary: (state, action) => {
      const { component, dictionary } = action.payload
      if (!state.addedDictionaries.includes(component)) {
        const mergedDictionaries = merge(state.dictionaries, dictionary)
        const addedDictionaries = state.addedDictionaries.concat([component])

        return {
          ...state,
          dictionaries: mergedDictionaries,
          setDictionary: mergedDictionaries[state.setLanguage],
          addedDictionaries: addedDictionaries
        }
      }
      return state
    }
  }
})
export const { addDictionary, setLanguage } = i18nSlice.actions

export default i18nSlice.reducer
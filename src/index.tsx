import React from 'react'
import i18n from 'i18next'
import ReactDOM from 'react-dom/client'
import { I18nextProvider, initReactI18next } from 'react-i18next'

import App from './App'
import resources from './locales/index'

import './App.css'

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </>,
)

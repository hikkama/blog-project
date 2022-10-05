// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './components/App'
import { setupStore } from './store'

import './styles/index.scss'

const store = setupStore()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

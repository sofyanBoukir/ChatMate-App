import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { Provider } from 'react-redux'
import { legacy_createStore } from 'redux'
import { userReducer } from './redux/UserStore/UserReduce'

const store = legacy_createStore(userReducer)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)

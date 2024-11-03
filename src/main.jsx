import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import AppProducts from './AppProducts.jsx'
import { Provider } from 'react-redux'
import store from "./redux/store"

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <AppProducts />
    </BrowserRouter>
  </Provider>
)

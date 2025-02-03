import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { RouterProvider } from 'react-router'
import { router } from './routes/Routes'
import { Toaster } from 'sonner'
import React from 'react'
import { persistor, store } from './redux/store'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
      <Toaster />
    </Provider>
  </React.StrictMode>
)

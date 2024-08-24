import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";import AdminPanel from './admin.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },{path:'/admin',element:<AdminPanel/>}
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

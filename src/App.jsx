import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"

function App() {

  return (
    <div>
      <Outlet></Outlet>
      <ToastContainer position="top-center" autoClose={1000}/>
    </div>
  )
}

export default App

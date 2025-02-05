import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactForm from "./Components/Form.tsx";

function App() {

  return (
      <>
        <h1>MobX Exercise</h1>
        <ReactForm showResetButton={true} showSaveButton={true}/>
      </>
  )
}

export default App

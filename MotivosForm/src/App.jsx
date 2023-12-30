import './App.css'
import Form from './components/Form'
import { useMediaQuery } from '@mui/material'

function App() {

  const xsResolution = useMediaQuery('(max-width:500px)');
  

  return (
    <>
    <div id={!xsResolution ? "app":"app_mobile"}>
      <Form xsResolution={xsResolution}/>
    </div>
    </>
  )
}

export default App

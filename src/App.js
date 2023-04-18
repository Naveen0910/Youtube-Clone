import {Switch, Route} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
  </Switch>
)

export default App

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import { ComicsList } from '../pages'
import { Header, Footer } from '../molecules'

export default function Root() {
  return (
    <Router>
        <Header />
        <Switch>
          <Route path="/:character?">
            <ComicsList />
          </Route>
        </Switch>
        <Footer />
    </Router>
  )
}

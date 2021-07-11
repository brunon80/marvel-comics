import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import { ComicsList } from '../pages'
import { Header, Footer } from '../molecules'
import { ComicsProvider } from '../store/comicsStore'

export default function Root() {
  return (
    <Router>
      <ComicsProvider>
        <Header />
        <Switch>
          <Route path="/:character?">
            <ComicsList />
          </Route>
        </Switch>
        <Footer />
      </ComicsProvider>
    </Router>
  )
}

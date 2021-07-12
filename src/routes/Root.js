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
      <Switch>
        <Route path="/:character?">
          <ComicsProvider>
            <Header />
            <ComicsList />
            <Footer />
          </ComicsProvider>
        </Route>
      </Switch>
    </Router>
  )
}

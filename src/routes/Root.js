import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import { ComicsList } from '../pages'
import { Header, Footer } from '../molecules'

export default function Root() {
  return (
    <Router>
        <Header />
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav> */}

        <Switch>
          {/* <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route> */}
          <Route path="/">
            <ComicsList />
          </Route>
        </Switch>
        <Footer />
    </Router>
  )
}

import {
  Switch,
  Route,
} from "react-router-dom"
import { ComicsList } from '../pages'
import { Header, Footer } from '../molecules'
import { ComicsProvider } from '../store/comicsStore'
import { Wrapper } from '../atoms'

export default function Root() {
  return (
    <Switch>
      <Route path="/:character?">
        <ComicsProvider>
          <Header />
          <Wrapper>
            <ComicsList />
            <Footer />
          </Wrapper>
        </ComicsProvider>
      </Route>
    </Switch>
  )
}

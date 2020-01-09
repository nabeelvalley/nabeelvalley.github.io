import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import React, { Suspense, lazy } from 'react';
import Preloader from './Components/Preloader/Preloader';
import Footer from './Components/Footer/Footer'
import Navbar from './Components/Navbar/Navbar'
import ScrollToTop from './Components/Helpers/ScrollToTop'

import './App.css'

const Home = lazy(() => import('./Home/Home'));
const Blog = lazy(() => import('./Blog/Blog'));
const Code = lazy(() => import('./Code/Code'));
const About = lazy(() => import('./About/About'));
const Post = lazy(() => import('./Components/Post/Post'));
const Zwartkops = lazy(() => import('./Zwartkops/Zwartkops'));

const App = (props) => (
  <div className="App">
    <Router>
      <Navbar />
      <ScrollToTop />
      <Suspense fallback={<Preloader />}>
        <Switch>
          <Route exact path="/gallery/zwartkops" component={Zwartkops} />

          <Redirect exact from="/" to="home" />

          <Route exact path="/home" component={Home} />
          <Route exact path="/blog" component={Blog} />
          <Route exact path="/code" component={Code} />
          <Route exact path="/about" component={About} />

          {/* Manually passing key as current pathname to force remount on route change */}
          <Route exact path="*" component={(props) => <Post location={props.location} key={props.location.pathname} />} />

          <Redirect to="/home" />

        </Switch>

        <Route path="/" render={({ location }) => {
          if (typeof window.ga === 'function') {
            window.ga('set', 'page', location.pathname + location.search);
            window.ga('send', 'pageview');
          }
          return null;
        }} />
      </Suspense>
      <Footer />
    </Router>
  </div>
)
export default App
import "./components/styles/App.module.css";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import SpecialPage from "./components/pages/SpecalPage";
import Page from "./components/pages/Page";
import { Toaster } from "sonner";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <>
      <Toaster position="top-center" richColors closeButton />
      <Router>
        <Switch>
          <Route path="/" exact component={SpecialPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="*" component={Page} />
        </Switch>
      </Router>
    </>
  );
}

export default App;

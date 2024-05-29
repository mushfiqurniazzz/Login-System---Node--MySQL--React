//importing functional components, functions and libraries
import "./components/styles/App.module.css";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import SpecialPage from "./components/pages/SpecalPage";
import Page from "./components/pages/Page";
import { Toaster } from "sonner";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//main app function which is also a functional component that will be pased to main.jsx
function App() {
  return (
    <>
      {/* more on this component on sonner website */}
      <Toaster duration={2000} position="top-center" richColors closeButton />
      {/* router here */}
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

//exporting this
export default App;

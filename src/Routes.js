import {BrowserRouter, Switch, Route} from "react-router-dom";
import {LoginPage} from "./pages/LoginPage";
import {RegisterPage} from './pages/RegisterPage';
import {NotFoundPage} from './pages/NotFoundPage';
import {Homepage} from './pages/Homepage';

export const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Homepage/>
                </Route>
                <Route path="/login">
                    <LoginPage/>
                </Route>
                <Route path="/register">
                    <RegisterPage/>
                </Route>
                <Route>
                    <NotFoundPage/>
                </Route>
            </Switch>
        </BrowserRouter>

    );
}
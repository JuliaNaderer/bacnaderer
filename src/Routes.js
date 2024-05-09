import {BrowserRouter, Switch, Route} from "react-router-dom";
import {LoginPage} from "./pages/LoginPage";
import {RegisterPage} from './pages/RegisterPage';
import {NotFoundPage} from './pages/NotFoundPage';

export const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
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
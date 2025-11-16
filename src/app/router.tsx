import { createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import Dashboard from "./routes/dashboard.tsx";

export const router = createBrowserRouter([
    { path: '/',
        element: <App/>,
        children: [
            { path: '/',
                element: <Dashboard/>,
                children: []},
        ]},
], {
    basename: '/sw-dashboard-react/'
});
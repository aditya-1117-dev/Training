import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Contact, {
    loader as contactLoader,
} from "./routes/contact";

import {
    action as editAction,
} from "./routes/edit";

import { action as destroyAction } from "./routes/destroy";


import App from './App.jsx'
//
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


import Root, { loader as rootLoader, action as rootAction} from "./routes/root";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./error-page.jsx";
import EditContact from "./routes/edit.jsx";
import Index from "./routes/index.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: rootLoader,
        action : rootAction,
        children: [
            { index: true, element: <Index /> },
            {
                path: "contacts/:contactId",
                element: <Contact />,
                loader: contactLoader,
            },
            {
                path: "contacts/:contactId/edit",
                element: <EditContact />,
                loader: contactLoader,
                action: editAction,
            },
            {
                path: "contacts/:contactId/destroy",
                action: destroyAction,
                errorElement: <div>Oops! There was an error.</div>,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);


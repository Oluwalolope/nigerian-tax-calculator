import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import Result from "./pages/Result";
import AiAssistant from "./pages/AiAssistant";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/calculator',
        element: <Calculator />,
    },
    {
        path: '/result',
        element: <Result />,
    },
    {
        path: '/ai-assistant',
        element: <AiAssistant />,
    },
]);

export default router;
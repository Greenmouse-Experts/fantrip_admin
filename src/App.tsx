import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { adminRooutes } from "./routes/adminRoutes";
import LoginPage from "./pages/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatProvider from "./layout/provider/chat-provider";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  ...adminRooutes,
]);
function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <RouterProvider router={router} />
      <ChatProvider/>
    </>
  );
}

export default App;

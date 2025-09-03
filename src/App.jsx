import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import EditProfile from "./components/EditProfile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import axios from "axios";

axios.defaults.withCredentials = true; // no need to modify axios requests

function App() {
    return (
        <>
            <Provider store={appStore}>
                <BrowserRouter basename="/">
                    <Routes>
                        <Route path="/" element={<Body />}>
                            <Route path="/" element={<Feed />}></Route>
                            <Route path="/login" element={<Login />}></Route>
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/connections" element={<Connections />} />
                            <Route path="/requests" element={<Requests />} />
                        </Route>
                        <Route path="/about" element={<h1>Welcome to about page</h1>}></Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </>
    );
}
export default App;

import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useSelector } from "react-redux";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import SideBar from "./components/SideBar/SideBar";
import TransactionList from "./components/TransactionList/TransactionList";
import HotelList from "./components/HotelList/HotelList";
import CreateHotel from "./components/CreateHotel/CreateHotel";
import RoomList from "./components/RoomList/RoomList";
import CreateRoom from "./components/CreateRoom/CreateRoom";
import UserList from "./components/UserList/UserList";
import UpdateHotel from "./components/UpdateHotel/UpdateHotel";
import UpdateRoom from "./components/UpdateRoom/UpdateRoom";
import RequireLogin from "./components/RequireLogin/RequireLogin";

function App() {
  const { isLogin } = useSelector((state) => state.authReducer);

  return (
    <BrowserRouter>
      <Navbar />

      <main id="home_page">
        <SideBar />

        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Router user */}
          <Route
            path="/admin/users"
            element={!isLogin ? <RequireLogin /> : <UserList />}
          />

          {/* Router hotel */}
          <Route
            path="/admin/hotels"
            element={!isLogin ? <RequireLogin /> : <HotelList />}
          />
          <Route
            path="/admin/create-hotel"
            element={!isLogin ? <RequireLogin /> : <CreateHotel />}
          />
          <Route
            path="/admin/update-hotel"
            element={!isLogin ? <RequireLogin /> : <UpdateHotel />}
          />

          {/* Router room  */}
          <Route
            path="/admin/rooms"
            element={!isLogin ? <RequireLogin /> : <RoomList />}
          />
          <Route
            path="/admin/create-room"
            element={!isLogin ? <RequireLogin /> : <CreateRoom />}
          />
          <Route
            path="/admin/update-room"
            element={!isLogin ? <RequireLogin /> : <UpdateRoom />}
          />

          {/* Router transactions */}
          <Route
            path="/admin/transactions"
            element={!isLogin ? <RequireLogin /> : <TransactionList />}
          />

          {/* Router đăng nhâp */}
          <Route
            path="/login"
            element={isLogin ? <Navigate to="/" replace /> : <LoginPage />}
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

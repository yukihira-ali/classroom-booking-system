import { BrowserRouter, Route, Routes } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { BookingContext } from "./contexts/BookingContext";
import AddBooking from "./pages/AddBooking";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import UserBar from "./components/UserBar";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";

function Layout() {
  return (
    <div>
      <UserBar />
    </div>
  )
}

export default function App() {
  const [bookings, setBookings] = useLocalStorage("bookings", []);

  return (
    <BookingContext.Provider value={{ bookings, setBookings }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/add" element={<AddBooking />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BookingContext.Provider>
  );
}

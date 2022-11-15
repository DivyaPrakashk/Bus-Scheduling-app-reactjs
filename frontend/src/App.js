import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRegistration from './components/UserRegistration/UserRegistration';
import HomeLayout from './components/HomeLayout/HomeLayout';
import Login from './components/Login/login';
import Home from './components/Home/Home';
import UserProfile from './components/UserProfile/userProfile';
import UserEdit from './components/UserEditProfile/userEdit';
import UserLayout from './components/UserLayout/UserLayout';
import UserHome from './components/UserHome/UserHome';
import AdminHome from './components/AdminHome/AdminHome';
import AdminLayout from './components/AdminLayout/AdminLayout';
import Footer from './components/Footer/Footer';
import AllUsers from './components/AdminViewUsers/allUsers';
import TravelHistory from './components/TravelHistory/travelHistory';
import AdminProfile from './components/Admin Profile/AdminProfile';
import AdminEdit from './components/AdminEditProfile/AdminEditProfile';
import Ticket from './components/Ticket/Ticket';
import Payment from './components/Payment/Payment';
import DeleteTicket from './components/TravelHistory/DeleteTicket';
import AddBus from './components/AdminBuss/AdminBus';
import BusFilter from './components/BusFilter/BusFilter';
import Select from './components/SelectSeat/SelectSeat'
import EditBus from './components/AdminBusEdit/AdminBusEdit';
import UserGiveFeedback from './components/UserFeedback/UserFeedback'
import UserViewFeedback from './components/UserFeedback/UserViewFeedback'
import AdminViewAllFeedbacks from './components/AdminFeedback/AdminAllFeedback'
import AdminFeedbackEditdetails from './components/AdminFeedback/AdminEditFeedback'
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          {/* <Route exact path='/users/register' element={<UserRegistration/>}/> */}
          <Route element={<HomeLayout />}>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/users/register' element={<UserRegistration />} />
            <Route exact path='/users/login' element={<Login />} />
          </Route>
          <Route element={<UserLayout />}>
            <Route exact path='/users' element={<UserHome />} />
            <Route exact path='/users/viewprofile/:_id' element={<UserProfile />} />
            <Route exact path='/users/updateUser/:_id' element={<UserEdit />} />
            <Route exact path='/' element={<Home />} />
            <Route exact path='/users/travelhistory/:_id' element={<TravelHistory />} />
            <Route exact path='/tickets/getTicket/:_id' element={<Ticket />} />
            <Route exact path='/payment' element={<Payment />} />
            <Route exact path='/busSearch' element={<BusFilter />} />
            <Route exact path='/selectSeats/:id' element={<Select/>} />
            
            <Route exact path='/tickets/getTicket/:_id/delete' element={<DeleteTicket />} />
            <Route exact path='/users/givefeedback' element={<UserGiveFeedback/>}/>
            <Route exact path = '/users/viewfeedback/:_id' element = {<UserViewFeedback/>}/>
          </Route>
          <Route element={<AdminLayout />}>
            <Route exact path='/admin' element={<AdminHome />} />
            <Route exact path='/admin/viewprofile/:_id' element={<AdminProfile />} />
            <Route exact path='/' element={<Home />} />
            <Route exact path='/admin/allusers' element={<AllUsers />} />
            <Route exact path='/admin/travelhistory/:_id' element={<TravelHistory />} />
            <Route exact path='/admin/update/:_id' element={<AdminEdit />} />
            <Route exact path='/admin/addbus' element={<AddBus />} />
            <Route exact path='/admin/editbus/:id' element={<EditBus />} />
            <Route exact path = '/admin/viewallfeedback' element={<AdminViewAllFeedbacks/>}/>
            <Route exact path = '/admin/:_id/editfeedback' element={<AdminFeedbackEditdetails/>}/>
          </Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;

import { Route, Routes } from 'react-router-dom';
import AddTools from './components/Pages/Dashboard/AddTools/AddTools';
import Blogs from './components/Pages/Blogs/Blogs';
import Dashboard from './components/Pages/Dashboard/Dashboard';
import Home from './components/Pages/Home/Home';
import Login from './components/Pages/Login/Login';
import MyPortfolio from './components/Pages/MyPortfolio/MyPortfolio';
import Register from './components/Pages/Register/Register';
import RequireAuth from './components/Protector/RequireAuth/RequireAuth';
import Header from './components/Shared/Header/Header';
import { QueryClient, QueryClientProvider } from 'react-query'
import AllUser from './components/Pages/Dashboard/AllUser/AllUser';
import Purchase from './components/Pages/Purchase/Purchase';
import ManageAllOrder from './components/Pages/Dashboard/ManageAllOrder/ManageAllOrder';
import MyOrders from './components/Pages/Dashboard/MyOrders/MyOrders';
import MyProfile from './components/Pages/Dashboard/MyProfile/MyProfile';
import Payment from './components/Pages/Payment/Payment';
import Footer from './components/Shared/Footer/Footer';
import NotFound from './components/Pages/NotFound/NotFound';
import ManageProducts from './components/Pages/Dashboard/ManageProducts/ManageProducts';
import AddReview from './components/Pages/Dashboard/AddReview/AddReview';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/portfolio' element={<MyPortfolio />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/purchase/:id' element={
          <RequireAuth>
            <Purchase />
          </RequireAuth>
        } />
        <Route path='/payment/:orderID' element={
          <RequireAuth>
            <Payment />
          </RequireAuth>
        } />

        <Route path='/dashboard' element={<Dashboard />}>
          <Route index element={<MyProfile />}></Route>
          <Route path='allUsers' element={<AllUser />}></Route>
          <Route path='allOrders' element={<ManageAllOrder />}></Route>
          <Route path='addTools' element={<AddTools />}></Route>
          <Route path='myOrders' element={<MyOrders />}></Route>
          <Route path='allOrders' element={<ManageAllOrder />}></Route>
          <Route path='manageProducts' element={<ManageProducts />}></Route>
          <Route path='addReview' element={<AddReview />}></Route>
        </Route>
        <Route path='/dashboard' element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        } />
        <Route path='/addTools' element={<AddTools />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

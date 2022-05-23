import { Route, Routes } from 'react-router-dom';
import AddTools from './components/Pages/AddTools/AddTools';
import Blogs from './components/Pages/Blogs/Blogs';
import Dashboard from './components/Pages/Dashboard/Dashboard';
import Home from './components/Pages/Home/Home';
import Login from './components/Pages/Login/Login';
import MyOrders from './components/Pages/MyOrders/MyOrders';
import MyPortfolio from './components/Pages/MyPortfolio/MyPortfolio';
import Register from './components/Pages/Register/Register';
import RequireAuth from './components/Protector/RequireAuth/RequireAuth';
import Header from './components/Shared/Header/Header';
import { QueryClient, QueryClientProvider } from 'react-query'
import AllUser from './components/Pages/Dashboard/AllUser/AllUser';
import Purchase from './components/Pages/Purchase/Purchase';
import ManageAllOrder from './components/Pages/Dashboard/ManageAllOrder/ManageAllOrder';

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
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
          <Route path='/dashboard' element={<Dashboard />}>
            <Route index element={<AllUser />}></Route>
            <Route path='allOrders' element={<ManageAllOrder />}></Route>
          </Route>
          <Route path='/dashboard' element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          } />
          <Route path='/myOrders' element={
            <RequireAuth>
              <MyOrders />
            </RequireAuth>
          } />
          <Route path='/addTools' element={<AddTools />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;

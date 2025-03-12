import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import AdminLayout from './component/Admin/AdminLayout'
import EditProductPage from './component/Admin/EditProductPage'
import OrderManagement from './component/Admin/OrderManagement'
import ProductManagement from './component/Admin/ProductManagement'
import UserManagement from './component/Admin/UserManagement'
import Checkout from './component/Cart/Checkout'
import UserLayout from './component/Layout/UserLayout'
import ProductDetail from './component/Products/ProductDetail'
import AdminHomePages from './pages/AdminPage/AdminHomePages'
import CollectionPage from './pages/CollectionPage'
import Home from './pages/Home'
import Login from './pages/Login'
import MyOrders from './pages/MyOrders'
import OrderComfirm from './pages/OrderComfirm'
import OrderDetail from './pages/OrderDetail'
import Profile from './pages/Profile'
import Register from './pages/Register'

// history
// store
import { Provider } from 'react-redux'
import ProtectedRoutes from './component/Common/ProtectedRoutes'
import ScrollToTop from './hooks/useScrollToTop'
import store from './redux/store'
function App() {

  return (
    // <BrowserRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
    <Provider store={store}>
      <BrowserRouter >
        <Toaster position="top-right" />
        <ScrollToTop />
        <Routes>
          { /* USER LAYOUT*/}
          <Route path='/' element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='profile' element={<Profile />} />
            <Route path='collection/:collection' element={<CollectionPage />} />
            <Route path='product/:id' element={<ProductDetail />} />
            <Route path='checkout' element={<Checkout />} />
            <Route path='order-confirmation' element={<OrderComfirm />} />
            <Route path='order/:id' element={<OrderDetail />} />
            <Route path='my-orders' element={<MyOrders />} />
          </Route>
          { /* ADMIN LAYOUT*/}
          <Route path='/admin' element={<ProtectedRoutes role="admin"><AdminLayout /></ProtectedRoutes>}>
            <Route index element={<AdminHomePages />} />
            <Route path='users' element={<UserManagement />} />
            <Route path='products' element={<ProductManagement />} />
            <Route path='products/:id/edit' element={<EditProductPage />} />
            <Route path='orders' element={<OrderManagement />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App

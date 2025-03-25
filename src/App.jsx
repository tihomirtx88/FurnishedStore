import { About, Cart, Checkout, Login, Error, HomeLayout, Landing, Orders, Products, Register, SingleProduct } from './pages';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout/>,
    errorElement: <Error/>,
    children: [
      {
        index: true,
        element: <Landing/>
      },
      {
        path: 'products',
        element: <Products/>
      },
      {
        path: 'products/:id',
        element: <SingleProduct/>
      },
      {
        path: 'cart',
        element: <Cart/>
      },
      {
        path: 'orders',
        element: <Orders/>
      },
      {
        path: 'about',
        element: <About/>
      },
      {
        path: 'checkout',
        element: <Checkout/>
      },
    ]
  },
  {
    path: '/login',
    element: <Login/>,
    errorElement: <Error/>
  },
  {
    path: '/register',
    element: <Register/>,
    errorElement: <Error/>
  },
]);

function App() {

  return (
   <RouterProvider router={router}/>
  )
}

export default App

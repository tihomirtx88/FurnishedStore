import ErrorElement from './components/ErrorElement.jsx';
import { About, Cart, Checkout, Login, Error, HomeLayout, Landing, Orders, Products, Register, SingleProduct } from './pages/idnex.js';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';

//loaders
import { loader as landingLoader} from './pages/Landing.jsx';
import { loader as singleProductLoader} from './pages/SingleProduct.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout/>,
    errorElement: <Error/>,
    children: [
      {
        index: true,
        element: <Landing/>,
        errorElement: <ErrorElement/>,
        loader: landingLoader
      },
      {
        path: 'products',
        element: <Products/>
      },
      {
        path: 'products/:id',
        element: <SingleProduct/>,
        loader: singleProductLoader
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

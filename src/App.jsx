import ErrorElement from './components/ErrorElement.jsx';
import { About, Cart, Checkout, Login, Error, HomeLayout, Landing, Orders, Products, Register, SingleProduct } from './pages/idnex.js';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';

//loaders
import { loader as landingLoader} from './pages/Landing.jsx';
import { loader as singleProductLoader} from './pages/SingleProduct.jsx';
import { loader as productsLoader} from './pages/Products.jsx';
import { loader as checkoutLoader} from './pages/Checkout.jsx';

// actions
import { action as registerAction} from './pages/Register.jsx';
import { action as loginAction} from './pages/Login.jsx';
import { action as checkoutAction} from './components/CheckoutForm.jsx';

import { store } from "./store.js";

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
        element: <Products/>,
        loader: productsLoader
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
        element: <Checkout/>,
        loader: checkoutLoader(store),
        action: checkoutAction(store)
      },
    ]
  },
  {
    path: '/login',
    element: <Login/>,
    errorElement: <Error/>,
    // Passing store in action
    action: loginAction(store)
  },
  {
    path: '/register',
    element: <Register/>,
    errorElement: <Error/>,
    action: registerAction
  },
]);

function App() {


  return (
   <RouterProvider router={router}/>
  )
}

export default App

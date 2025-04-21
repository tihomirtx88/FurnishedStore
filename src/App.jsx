import ErrorElement from './components/ErrorElement.jsx';
import { About, Cart, Checkout, Login, Error, HomeLayout, Landing, Orders, Products, Register, SingleProduct, EditProductPage } from './pages/idnex.js';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';

//loaders
import { loader as landingLoader} from './pages/Landing.jsx';
import { loader as singleProductLoader} from './pages/SingleProduct.jsx';
import { loader as productsLoader} from './pages/Products.jsx';
import { loader as checkoutLoader} from './pages/Checkout.jsx';
import { loader as orderLoader} from './pages/Orders.jsx';


// actions
import { action as registerAction} from './pages/Register.jsx';
import { action as loginAction} from './pages/Login.jsx';
import { action as checkoutAction} from './components/CheckoutForm.jsx';

import { store } from "./store.js";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime: 100 * 60 * 5
    }
  }
});

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
        loader: landingLoader(queryClient)
      },
      {
        path: 'products',
        element: <Products/>,
        loader: productsLoader(queryClient)
      },
      {
        path: 'products/:id',
        element: <SingleProduct/>,
        loader: singleProductLoader(queryClient)
      },
      {
        path: 'products/:id/edit',
        element: <EditProductPage/>,
        loader: singleProductLoader(queryClient)
      },
      {
        path: 'cart',
        element: <Cart/>
      },
      {
        path: 'orders',
        element: <Orders/>,
        loader: orderLoader(store,queryClient)
      },
      {
        path: 'about',
        element: <About/>
      },
      {
        path: 'checkout',
        element: <Checkout/>,
        loader: checkoutLoader(store),
        action: checkoutAction(store, queryClient)
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
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  )
}

export default App

import { toast } from 'react-toastify';
import { customFetch } from '../utils/idnex';
import { SubmitBtn, FormInput} from './../components';
import { Link, Form, redirect } from 'react-router-dom';
import { loginUser } from '../features/user/userSlice';

export const action = ( store ) => async ({request}) => {
  // Action recive function (store)
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await customFetch.post('/auth/login', data);
    // Pass response data to userslice
    store.dispatch(loginUser(response.data));
    console.log(response);
    
    toast.success('Account login successfully');
    return redirect('/');
  } catch (error) {
    const errorMessage = error?.response?.data?.error?.message || 'Please double check your credentials!';
    toast.error(errorMessage);
    return null;
  }
};

const Login = () => {
    return(
        <section className='h-screen grid place-items-center'>
          <Form method='POST' className='card w-96 py-8 px-8 bg-base-100 shadow-lg flex flex-col gap-y-4'>
            <h4 className='text-center text-3xl font-bold'>Login</h4>
            <FormInput type='email' label='email' name='email'/>
            <FormInput type='password' label='passowrd' name='password'/>
            <div className='mt-4'>
                <SubmitBtn type='login'/>
            </div>
            <button type='button' className='btn btn-secondary btn-block '>guest user</button>
            <p className='text-center'>Not a member yet? <Link to='/register' className='ml-2 link link-hover link-primary capitalize'>Register</Link></p>
          </Form>
        </section>
    );
};

export default Login;
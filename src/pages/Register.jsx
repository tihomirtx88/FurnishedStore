import { FormInput, SubmitBtn } from '../components';
import { Form, Link, redirect } from 'react-router-dom';
import { customFetch } from '../utils/idnex';
import { toast } from 'react-toastify';

export const action = async ({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await customFetch.post('/auth/register', data);
    console.log(response);
    
    toast.success('Account created successfully');
    redirect('/login');
  } catch (error) {
    const errorMessage = error?.response?.data?.error?.message || 'Please double check your credentials!';
    toast.error(errorMessage);
    return null;
  }
};

const Register = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <FormInput type="text" label="name" name="name" defaultValue='Tihomir Zhelyqzkov'/>
        <FormInput type="email" label="email" name="email" defaultValue='tester@abv.bg'/>
        <FormInput type="password" label="password" name="password" defaultValue='777733'/>
        <div className="mt-4">
          <SubmitBtn text="register" />
        </div>
        <p className="text-center">
          Already a member?
          <Link
            to="/login"
            className="ml-2 link link-hover link-primary capitalize"
          >
            login
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Register;

import React from 'react';
import { useDispatch } from 'react-redux';
import { registerUserRequest } from '../../../redux/features/user/userSlice';
import { toast } from 'react-hot-toast';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Create navigate function
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First name is required'),
        lastName: Yup.string()
            .required('Last name is required'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required'),
    });

    const handleSubmit = (values) => {
        const userData = {
            name: `${values.firstName} ${values.lastName}`,
            email: values.email,
            password: values.password,
            role: 'user'
        };
        dispatch(registerUserRequest(userData)); // Dispatch the registration request
        toast.success('Registration successful!');
        navigate('/activate'); // Navigate to login page after registration
    };

    return (
        <div className='h-screen flex items-center justify-center bg-[#181818]'>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="flex flex-col gap-4 max-w-md p-6 rounded-2xl bg-[#1a1a1a] text-white border border-gray-700">
                        <p className="text-2xl font-semibold text-[#00bfff] relative flex items-center pl-8">
                            Register
                            <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-[#00bfff] rounded-full"></span>
                        </p>
                        <span className='text-3xl text-center font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent'>NegaritBeats</span>
                        <p className="text-sm text-gray-400 text-center">Signup now and get full access to our app.</p>
                        <div className="flex gap-2">
                            <label className="flex-1 relative">
                                <Field
                                    className="bg-[#333] text-white w-full py-2 px-3 rounded-md border border-gray-600 focus:outline-none focus:border-[#00bfff] placeholder-transparent"
                                    type="text"
                                    name="firstName"
                                    placeholder=" "
                                />
                                <span className="absolute left-3 top-1 text-gray-400 transition-all duration-200 transform origin-left scale-100 pointer-events-none">Firstname</span>
                                <ErrorMessage name="firstName" component="div" className="text-red-500" />
                            </label>

                            <label className="flex-1 relative">
                                <Field
                                    className="bg-[#333] text-white w-full py-2 px-3 rounded-md border border-gray-600 focus:outline-none focus:border-[#00bfff] placeholder-transparent"
                                    type="text"
                                    name="lastName"
                                    placeholder=" "
                                />
                                <span className="absolute left-3 top-1 text-gray-400 transition-all duration-200 transform origin-left scale-100 pointer-events-none">Lastname</span>
                                <ErrorMessage name="lastName" component="div" className="text-red-500" />
                            </label>
                        </div>

                        <label className="relative">
                            <Field
                                className="bg-[#333] text-white w-full py-2 px-3 rounded-md border border-gray-600 focus:outline-none focus:border-[#00bfff] placeholder-transparent"
                                type="email"
                                name="email"
                                placeholder=" "
                            />
                            <span className="absolute left-3 top-1 text-gray-400 transition-all duration-200 transform origin-left scale-100 pointer-events-none">Email</span>
                            <ErrorMessage name="email" component="div" className="text-red-500" />
                        </label>

                        <label className="relative">
                            <Field
                                className="bg-[#333] text-white w-full py-2 px-3 rounded-md border border-gray-600 focus:outline-none focus:border-[#00bfff] placeholder-transparent"
                                type="password"
                                name="password"
                                placeholder=" "
                            />
                            <span className="absolute left-3 top-1 text-gray-400 transition-all duration-200 transform origin-left scale-100 pointer-events-none">Password</span>
                            <ErrorMessage name="password" component="div" className="text-red-500" />
                        </label>

                        <label className="relative">
                            <Field
                                className="bg-[#333] text-white w-full py-2 px-3 rounded-md border border-gray-600 focus:outline-none focus:border-[#00bfff] placeholder-transparent"
                                type="password"
                                name="confirmPassword"
                                placeholder=" "
                            />
                            <span className="absolute left-3 top-1 text-gray-400 transition-all duration-200 transform origin-left scale-100 pointer-events-none">Confirm Password</span>
                            <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
                        </label>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-4 py-2 rounded-md bg-[#00bfff] text-white font-semibold transition duration-200 hover:bg-[#00bfff96]"
                        >
                            Submit
                        </button>

                        <p className="text-sm text-gray-400 text-center">
                            Already have an account? <a href="/login" className="text-[#00bfff] hover:underline">Login</a>
                        </p>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SignUp;

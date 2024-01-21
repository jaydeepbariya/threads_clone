import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);


  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full sm:w-96 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">Email<sup className='text-red-500'>*</sup></label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email format',
                },
              })}
              className={`w-full border rounded-md p-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-gray-600">Password <sup className='text-red-500'>*</sup></label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              {...register('password', {
                required: 'Password is required',
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                  message: 'Password must be alphanumeric with at least one special character and 6 characters or more',
                },
              })}
              className={`w-full border rounded-md p-2 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            />
            <div
              className="absolute top-9 right-3 cursor-pointer"
              onClick={()=>setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md py-2 w-full hover:bg-blue-600"
          >
            Login
          </button>


          <div className='mx-auto flex flex-col mt-4'>
            <p className='text-center'>Don't Have An Account ?</p>
            <Link to={"/register"} className='w-[50%] mx-auto px-1 py-2 rounded-md bg-slate-500 text-center mt-3'>Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

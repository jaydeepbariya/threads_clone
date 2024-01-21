import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);


  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full sm:w-96 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <p className="my-3 text-md">Register the experience the best of social media</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-600">Full Name<sup className='text-red-600'>*</sup></label>
            <input
              type="text"
              id="fullName"
              {...register('fullName', {
                required: 'Full Name is required',
              })}
              className={`w-full border rounded-md p-2 ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
            )}
          </div>

          {/* Username Field */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">Username<sup className='text-red-600'>*</sup></label>
            <input
              type="text"
              id="username"
              {...register('username', {
                required: 'Username is required',
              })}
              className={`w-full border rounded-md p-2 ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">Email<sup className='text-red-600'>*</sup></label>
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

          {/* Password Field */}
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-600">Password<sup className='text-red-600'>*</sup></label>
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
              onClick={()=> setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* ProfilePicture Field */}
          <div className="mb-4">
            <label htmlFor="profilePicture" className="block text-gray-600">Profile Picture <sup className='text-red-600'>*</sup></label>
            <input
              type="file"
              id="profilePicture"
              {...register('profilePicture', {
                required: 'Profile Picture is required',
                validate: {
                  fileFormat: (value) => {
                    const allowedFormats = ['jpg', 'jpeg', 'png', 'gif'];
                    const extension = value[0]?.name.split('.').pop().toLowerCase();
                    return allowedFormats.includes(extension) || 'Invalid file format';
                  }
                },
              })}
              className={`w-full border rounded-md p-2 ${errors.profilePicture ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.profilePicture && (
              <p className="text-red-500 text-sm mt-1">{errors.profilePicture.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md py-2 w-full hover:bg-blue-600"
          >
            Register
          </button>

          <div className='mx-auto flex flex-col mt-4'>
            <p className='text-center'>Already have an account ?</p>
            <Link to={"/login"} className='w-[50%] mx-auto px-1 py-2 rounded-md bg-slate-500 text-center mt-3'>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

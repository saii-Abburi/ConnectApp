import { NextPage } from 'next';
import { useState } from 'react';
import { Mail, Lock, Phone, User, ArrowRight, ArrowLeft } from 'lucide-react';

type AuthMode = 'login' | 'register' | 'forgot-password' | 'verify-otp';

interface FormData {
  email: string;
  password: string;
  name?: string;
  mobile?: string;
  otp?: string;
  acceptTerms?: boolean;
}

const Register: NextPage = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    name: '',
    mobile: '',
    otp: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Additional validations for register mode
    if (mode === 'register') {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (!formData.mobile) {
        newErrors.mobile = 'Mobile number is required';
      } else if (!/^\d{10}$/.test(formData.mobile)) {
        newErrors.mobile = 'Please enter a valid 10-digit mobile number';
      }
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = false;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission
      console.log('Form submitted:', formData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) {
      setErrors({ email: 'Email is required' });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors({ email: 'Please enter a valid email' });
      return;
    }
    // Here you would typically make an API call to send OTP
    console.log('Sending OTP to:', formData.email);
    setMode('verify-otp');
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.otp) {
      setErrors({ otp: 'OTP is required' });
      return;
    }
    if (!/^\d{6}$/.test(formData.otp)) {
      setErrors({ otp: 'Please enter a valid 6-digit OTP' });
      return;
    }
    // Here you would typically verify the OTP
    console.log('Verifying OTP:', formData.otp);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      acceptTerms: e.target.checked
    }));
    // Clear error when user checks the box
    if (errors.acceptTerms) {
      setErrors(prev => ({
        ...prev,
        acceptTerms: undefined
      }));
    }
  };

  const renderForgotPassword = () => (
    <form onSubmit={handleForgotPassword} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`appearance-none block w-full pl-10 pr-3 py-2 border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent`}
            placeholder="Enter your email address"
          />
        </div>
        {errors.email && (
          <p className="mt-2 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Send OTP
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center justify-center mt-4">
        <button
          type="button"
          onClick={() => setMode('login')}
          className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to login
        </button>
      </div>
    </form>
  );

  const renderVerifyOTP = () => (
    <form onSubmit={handleVerifyOTP} className="space-y-6">
      <div>
        <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
          Enter OTP
        </label>
        <p className="text-sm text-gray-500 mb-4">
          We've sent a 6-digit code to {formData.email}
        </p>
        <div className="mt-1">
          <input
            id="otp"
            name="otp"
            type="text"
            maxLength={6}
            value={formData.otp}
            onChange={handleInputChange}
            className={`appearance-none block w-full px-3 py-2 border ${
              errors.otp ? 'border-red-500' : 'border-gray-300'
            } rounded-lg text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent`}
            placeholder="000000"
          />
        </div>
        {errors.otp && (
          <p className="mt-2 text-sm text-red-600">{errors.otp}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Verify OTP
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 mt-4">
        <button
          type="button"
          onClick={() => setMode('forgot-password')}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Didn't receive the code? Resend
        </button>
        <button
          type="button"
          onClick={() => setMode('login')}
          className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to login
        </button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          {mode === 'login' && 'Sign in to your account'}
          {mode === 'register' && 'Create your account'}
          {mode === 'forgot-password' && 'Reset your password'}
          {mode === 'verify-otp' && 'Verify OTP'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm sm:rounded-lg sm:px-10">
          {/* Show different forms based on mode */}
          {(mode === 'login' || mode === 'register') && (
            <>
              {/* Mode Toggle */}
              <div className="flex rounded-lg border border-gray-200 p-1 mb-8">
                <button
                  onClick={() => setMode('login')}
                  className={`flex-1 py-2 rounded-md text-sm font-medium ${
                    mode === 'login' 
                      ? 'bg-black text-white' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setMode('register')}
                  className={`flex-1 py-2 rounded-md text-sm font-medium ${
                    mode === 'register' 
                      ? 'bg-black text-white' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Register
                </button>
              </div>

              {/* Login/Register Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {mode === 'register' && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`appearance-none block w-full pl-10 pr-3 py-2 border ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent`}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`appearance-none block w-full pl-10 pr-3 py-2 border ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {mode === 'register' && (
                  <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                      Mobile Number
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        className={`appearance-none block w-full pl-10 pr-3 py-2 border ${
                          errors.mobile ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent`}
                      />
                    </div>
                    {errors.mobile && (
                      <p className="mt-2 text-sm text-red-600">{errors.mobile}</p>
                    )}
                  </div>
                )}

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`appearance-none block w-full pl-10 pr-3 py-2 border ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent`}
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                {mode === 'register' && (
                  <div className="flex items-center mb-6">
                    <input
                      id="acceptTerms"
                      name="acceptTerms"
                      type="checkbox"
                      checked={formData.acceptTerms}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black cursor-pointer"
                    />
                    <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                      I agree to the{' '}
                      <a href="#" className="font-medium text-black hover:opacity-80">
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                )}

                {errors.acceptTerms && (
                  <p className="mt-1 text-sm text-red-600">{errors.acceptTerms}</p>
                )}

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    {mode === 'login' ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </form>

              {mode === 'login' && (
                <div className="mt-6">
                  <div className="text-sm text-center">
                    <button
                      onClick={() => setMode('forgot-password')}
                      className="font-medium text-black hover:opacity-80"
                    >
                      Forgot your password?
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {mode === 'forgot-password' && renderForgotPassword()}
          {mode === 'verify-otp' && renderVerifyOTP()}
        </div>
      </div>
    </div>
  );
};

export default Register; 
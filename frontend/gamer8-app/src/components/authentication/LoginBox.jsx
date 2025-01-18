import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginInput from './LoginInput';
import Spinner from './../ui/Spinner';
import useError from './../../hooks/useError';
import { AuthContext } from './../../contexts/AuthContext';

function LoginBox() {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
  });
  const { error, setError } = useError();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { checkAuthentication, isAuthenticated,user } = useContext(AuthContext);
  async function handleLoginSubmit(e) {
    e.preventDefault();
    if (!formData.usernameOrEmail || !formData.password) {
      setError(
        'Please fill in all data fields to login as a user!',
      );
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(
        'http://localhost:8000/gamer8/api/v1/users/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          credentials: 'include', // Include cookies with requests
        },
      );
      const data = await response.json();
      if (response.ok) {
        // set user in context
        localStorage.setItem(
          'user',
          JSON.stringify({ user: data.user }),
        );
        console.log('User successfully logged in!');
        await checkAuthentication();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <div className="mx-auto h-[60%] w-[45%] rounded-xl bg-cyan-950 px-4 py-8">
      <h1 className="mb-10 text-center font-header text-2xl font-bold text-yellow-300">
        Login
      </h1>
      {error && (
        <p className="mx-auto bg-red-500 p-4 text-base text-white">
          Login Error: {error}
        </p>
      )}
      <form
        className="mx-auto flex h-[70%] w-[100%] flex-col rounded-xl bg-cyan-950 px-2"
        onSubmit={handleLoginSubmit}
      >
        <LoginInput
          label="Username"
          placeholder="Username or Email"
          name="usernameOrEmail"
          isPassword={false}
          value={formData.usernameOrEmail}
          onChange={handleChange}
        />
        <LoginInput
          label="Password"
          placeholder="Password"
          name="password"
          isPassword={true}
          value={formData.password}
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
        />
        <button
          className="mx-auto h-[12%] w-[25%] rounded-md bg-yellow-300 font-header font-bold text-cyan-950"
          type="submit"
        >
          {isLoading ? <Spinner className="" /> : 'Login'}
        </button>
      </form>

      <p className="ml-4 mt-4 font-base text-yellow-300">
        New user?{' '}
        <button
          className="hover:underline"
          onClick={() => navigate('/register')}
        >
          Register here &rarr;
        </button>
      </p>
    </div>
  );
}

export default LoginBox;

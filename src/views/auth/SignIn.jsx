import api from 'api/api';
import InputField from 'components/fields/InputField';
import Toast from 'components/toast';
import { useEffect, useState } from 'react';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
function isValidEmail(email) {
  return emailRegex.test(email);
}

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailState, setEmailState] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('AUTH_TOKEN');
    if (token) {
      window.location.href = '/admin/default';
    }
  });
  const validateInputs = () => {
    let result = true;
    setPasswordState('error');
    if (!isValidEmail(email)) {
      setEmailState('error');
      result = false;
    } else {
      setEmailState('');
    }
    if (password.length === 0) {
      setPasswordState('error');
      result = false;
    } else {
      setPasswordState('');
    }

    return result;
  };

  const handleLogin = () => {
    const inputsAreValid = validateInputs();
    if (!inputsAreValid) {
      return;
    }

    setIsLoading(true);
    api
      .post('auth/login', { email: email, password: password })
      .then((response) => {
        console.log(response.data);

        Toast.fire({
          icon: 'success',
          title: 'Login realizado com sucesso, você será redirecionado!',
        });

        const token = response.data.token;

        localStorage.setItem('AUTH_TOKEN', token);
        localStorage.setItem('USER_DATA', JSON.stringify(response.data.user));

        setTimeout(() => {
          window.location.href = '/';
        }, 2000);

        setIsLoading(false);
      })
      .catch((error) => {
        Toast.fire({
          icon: 'error',
          title: 'Erro ao realizar login, tente novamente.',
        });
      });
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Seja bem-vindo 😊
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Digite seu e-mail e senha para acessar o sistema.
        </p>
        {/* Email */}
        <InputField
          state={emailState}
          variant="auth"
          extra="mb-3"
          label="E-mail*"
          placeholder="mail@simmmple.com"
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <InputField
          state={passwordState}
          variant="auth"
          extra="mb-3"
          label="Senha*"
          placeholder="Digite sua senha aqui"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
        >
          Login
        </button>
      </div>
    </div>
  );
}

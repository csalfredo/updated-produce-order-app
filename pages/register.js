import { useEffect } from 'react';
import { useRouter } from 'next/router';
import RegisterForm from './RegisterForm';
import { authService } from '../src/components/auth';

export default function Register() {
  const router = useRouter();

  useEffect(() => {
    authService.checkAuth().then((user) => {
      if (user) router.replace('/produceorder');
    });
  }, [router]);

  return <RegisterForm mode="public" />;
}

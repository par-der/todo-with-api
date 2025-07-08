import { AuthForm } from '@/features/auth-form';
import { Link } from 'react-router';

const RegisterPage = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="overflow-hidden rounded-lg border bg-background text-card-foreground shadow-sm">
          <div className="grid p-0 md:grid-cols-2">
            <div className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Create your account</h1>
                  <p className="text-muted-foreground text-balance">Sign up to start using Todo Inc</p>
                </div>
                <AuthForm />
                <div className="text-center text-sm">
                  Already have an account?{' '}
                  <Link to="/login" className="underline underline-offset-4">
                    Log in
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-muted relative hidden md:block">
              <img src="/login.jpg" alt="Todo background" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </div>
        </div>
        <div className="text-muted-foreground mt-4 text-center text-xs">
          By clicking continue, you agree to our{' '}
          <a href="#" className="underline underline-offset-4">
            Terms&nbsp;of&nbsp;Service
          </a>{' '}
          and{' '}
          <a href="#" className="underline underline-offset-4">
            Privacy&nbsp;Policy
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

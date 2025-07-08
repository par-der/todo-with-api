import { LoginForm } from '@/features/login-form';

const LoginPage = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="overflow-hidden rounded-lg border bg-background text-card-foreground shadow-sm">
          <div className="grid p-0 md:grid-cols-2">
            <div className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-balance">Login to your Todo Inc account</p>
                </div>
                <LoginForm />
                <div className="text-center text-sm">
                  Don't have an account?{' '}
                  <a href="#" className="underline underline-offset-4">
                    Sign up
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-muted relative hidden md:block">
              <img src="/login.jpg" alt="Image" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </div>
        </div>
        <div className="text-muted-foreground mt-4 text-center text-xs">
          By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

import { useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, Link, Stack, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { AuthLayout } from '../../layouts/AuthLayout';
import { loginSchema } from '../../schemas/authSchemas';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values) => {
    setServerError(null);
    try {
      await login(values.usernameOrEmail, values.password);
      enqueueSnackbar('Welcome back!', { variant: 'success' });
      const redirectTo = location.state?.from?.pathname || '/';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setServerError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to continue to your question bank">
      <Stack component="form" spacing={2.5} onSubmit={handleSubmit(onSubmit)} noValidate>
        {serverError && <Alert severity="error">{serverError}</Alert>}

        <TextField
          label="Username or email"
          fullWidth
          autoFocus
          autoComplete="username"
          error={Boolean(errors.usernameOrEmail)}
          helperText={errors.usernameOrEmail?.message}
          {...register('usernameOrEmail')}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          autoComplete="current-password"
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          {...register('password')}
        />

        <Link component={RouterLink} to="/forgot-password" variant="body2" sx={{ alignSelf: 'flex-end' }}>
          Forgot password?
        </Link>

        <Button type="submit" variant="contained" size="large" fullWidth disabled={isSubmitting}>
          {isSubmitting ? 'Signing in…' : 'Sign in'}
        </Button>

        <Link component={RouterLink} to="/register" variant="body2" sx={{ textAlign: 'center' }}>
          Don&apos;t have an account? Create one
        </Link>
      </Stack>
    </AuthLayout>
  );
}

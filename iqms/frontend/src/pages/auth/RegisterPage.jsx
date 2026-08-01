import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, Link, Stack, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { AuthLayout } from '../../layouts/AuthLayout';
import { registerSchema } from '../../schemas/authSchemas';
import { useAuth } from '../../contexts/AuthContext';

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (values) => {
    setServerError(null);
    try {
      await registerUser(values);
      enqueueSnackbar('Account created — welcome to IQMS!', { variant: 'success' });
      navigate('/', { replace: true });
    } catch (err) {
      setServerError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <AuthLayout title="Create your account" subtitle="Start building your interview question bank">
      <Stack component="form" spacing={2.5} onSubmit={handleSubmit(onSubmit)} noValidate>
        {serverError && <Alert severity="error">{serverError}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            label="First name"
            fullWidth
            error={Boolean(errors.firstName)}
            helperText={errors.firstName?.message}
            {...register('firstName')}
          />
          <TextField
            label="Last name"
            fullWidth
            error={Boolean(errors.lastName)}
            helperText={errors.lastName?.message}
            {...register('lastName')}
          />
        </Stack>

        <TextField
          label="Username"
          fullWidth
          autoComplete="username"
          error={Boolean(errors.username)}
          helperText={errors.username?.message}
          {...register('username')}
        />

        <TextField
          label="Email"
          type="email"
          fullWidth
          autoComplete="email"
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          {...register('email')}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          autoComplete="new-password"
          error={Boolean(errors.password)}
          helperText={errors.password?.message || 'At least 8 characters, with upper/lowercase, a digit, and a symbol'}
          {...register('password')}
        />

        <Button type="submit" variant="contained" size="large" fullWidth disabled={isSubmitting}>
          {isSubmitting ? 'Creating account…' : 'Create account'}
        </Button>

        <Link component={RouterLink} to="/login" variant="body2" sx={{ textAlign: 'center' }}>
          Already have an account? Sign in
        </Link>
      </Stack>
    </AuthLayout>
  );
}

import { useState } from 'react';
import { Link as RouterLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, Link, Stack, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { AuthLayout } from '../../layouts/AuthLayout';
import { resetPasswordSchema } from '../../schemas/authSchemas';
import { authService } from '../../services/authService';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(resetPasswordSchema) });

  const onSubmit = async (values) => {
    setServerError(null);
    try {
      await authService.resetPassword(token, values.newPassword);
      enqueueSnackbar('Password reset — please sign in with your new password.', { variant: 'success' });
      navigate('/login', { replace: true });
    } catch (err) {
      setServerError(err.response?.data?.message || 'This reset link is invalid or has expired.');
    }
  };

  if (!token) {
    return (
      <AuthLayout title="Invalid reset link">
        <Stack spacing={2.5}>
          <Alert severity="error">
            This password reset link is missing its token. Please request a new one.
          </Alert>
          <Link component={RouterLink} to="/forgot-password" variant="body2" sx={{ textAlign: 'center' }}>
            Request a new reset link
          </Link>
        </Stack>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Choose a new password" subtitle="Make it something you haven't used before">
      <Stack component="form" spacing={2.5} onSubmit={handleSubmit(onSubmit)} noValidate>
        {serverError && <Alert severity="error">{serverError}</Alert>}

        <TextField
          label="New password"
          type="password"
          fullWidth
          autoFocus
          autoComplete="new-password"
          error={Boolean(errors.newPassword)}
          helperText={errors.newPassword?.message || 'At least 8 characters, with upper/lowercase, a digit, and a symbol'}
          {...register('newPassword')}
        />

        <TextField
          label="Confirm new password"
          type="password"
          fullWidth
          autoComplete="new-password"
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        <Button type="submit" variant="contained" size="large" fullWidth disabled={isSubmitting}>
          {isSubmitting ? 'Resetting…' : 'Reset password'}
        </Button>

        <Link component={RouterLink} to="/login" variant="body2" sx={{ textAlign: 'center' }}>
          Back to sign in
        </Link>
      </Stack>
    </AuthLayout>
  );
}

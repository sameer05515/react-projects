import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../../layouts/AuthLayout';
import { forgotPasswordSchema } from '../../schemas/authSchemas';
import { authService } from '../../services/authService';

export default function ForgotPasswordPage() {
  const [serverError, setServerError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(forgotPasswordSchema) });

  const onSubmit = async (values) => {
    setServerError(null);
    try {
      await authService.forgotPassword(values.email);
      // Always shown regardless of whether the email is registered — the
      // backend deliberately gives an identical response either way, so an
      // attacker can't use this endpoint to enumerate accounts.
      setSubmitted(true);
    } catch (err) {
      setServerError(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  if (submitted) {
    return (
      <AuthLayout title="Check your email">
        <Stack spacing={2.5}>
          <Alert severity="success">
            If an account exists for that email, we&apos;ve sent a link to reset your password.
            The link is valid for 30 minutes.
          </Alert>
          <Link component={RouterLink} to="/login" variant="body2" sx={{ textAlign: 'center' }}>
            Back to sign in
          </Link>
        </Stack>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Reset your password" subtitle="We'll email you a link to get back in">
      <Stack component="form" spacing={2.5} onSubmit={handleSubmit(onSubmit)} noValidate>
        {serverError && <Alert severity="error">{serverError}</Alert>}

        <Typography variant="body2" color="text.secondary">
          Enter the email associated with your account.
        </Typography>

        <TextField
          label="Email"
          type="email"
          fullWidth
          autoFocus
          autoComplete="email"
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          {...register('email')}
        />

        <Button type="submit" variant="contained" size="large" fullWidth disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Send reset link'}
        </Button>

        <Link component={RouterLink} to="/login" variant="body2" sx={{ textAlign: 'center' }}>
          Back to sign in
        </Link>
      </Stack>
    </AuthLayout>
  );
}

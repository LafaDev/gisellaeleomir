import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, Alert } from '@mui/material';
import { login as apiLogin } from '../services/userAPI';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from || '/panel';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Preencha email e senha.');
      return;
    }

    try {
      setLoading(true);
      await apiLogin(email, password);
      // redirect to the page user wanted or /panel
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err?.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          bgcolor: 'background.paper',
          p: 3,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h5" align="center">Entrar</Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />

        <Button type="submit" variant="contained" disabled={loading} fullWidth>
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>

        <Button variant="text" onClick={() => navigate('/')}>Voltar ao site</Button>
      </Box>
    </Container>
  );
}

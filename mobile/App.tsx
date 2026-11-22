import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { API_BASE_URL } from './src/config/api';
import { fetchBackendHealth, HealthResponse } from './src/services/health';

type ConnectionState = 'loading' | 'connected' | 'error';

export default function App() {
  const [state, setState] = useState<ConnectionState>('loading');
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const checkConnection = useCallback(async () => {
    setState('loading');
    setErrorMessage(null);

    try {
      const data = await fetchBackendHealth();
      setHealth(data);
      setState('connected');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Falha ao conectar ao backend';
      setHealth(null);
      setErrorMessage(message);
      setState('error');
    }
  }, []);

  useEffect(() => {
    void checkConnection();
  }, [checkConnection]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.card}>
        <Text style={styles.title}>Herbar.ia</Text>
        <Text style={styles.subtitle}>Diagnóstico de conexão local</Text>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Backend URL</Text>
          <Text style={styles.mono}>{API_BASE_URL}</Text>
        </View>

        <View style={styles.statusRow}>
          {state === 'loading' && (
            <>
              <ActivityIndicator size="small" color="#2d6a4f" />
              <Text style={styles.statusText}>Testando /health...</Text>
            </>
          )}
          {state === 'connected' && health && (
            <View style={styles.resultBox}>
              <Text style={styles.successText}>
                Conectado ({health.service})
              </Text>
              <Text style={styles.metaText}>{health.timestamp}</Text>
            </View>
          )}
          {state === 'error' && (
            <View style={styles.resultBox}>
              <Text style={styles.errorText}>Erro: {errorMessage}</Text>
            </View>
          )}
        </View>

        <Pressable style={styles.button} onPress={() => void checkConnection()}>
          <Text style={styles.buttonText}>Testar conexão</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7f5',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    gap: 16,
    borderWidth: 1,
    borderColor: '#dce5df',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1b4332',
  },
  subtitle: {
    fontSize: 15,
    color: '#52796f',
  },
  infoBox: {
    backgroundColor: '#f8faf9',
    borderRadius: 10,
    padding: 12,
    gap: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#52796f',
    textTransform: 'uppercase',
  },
  mono: {
    fontSize: 13,
    color: '#1b4332',
  },
  statusRow: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  resultBox: {
    gap: 4,
  },
  statusText: {
    fontSize: 14,
    color: '#40916c',
  },
  successText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2d6a4f',
  },
  metaText: {
    fontSize: 12,
    color: '#6c757d',
  },
  errorText: {
    fontSize: 14,
    color: '#b00020',
  },
  button: {
    backgroundColor: '#2d6a4f',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
});


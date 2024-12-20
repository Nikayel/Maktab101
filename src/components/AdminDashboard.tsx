import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  // In a real application, you would check if the user has admin privileges
  const isAdmin = user?.email === 'admin@example.com'; // This is just an example

  if (!isAdmin) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>You do not have permission to access this page.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <Text style={styles.subtitle}>Welcome, Admin!</Text>
      {/* Add admin-specific content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AdminDashboard;


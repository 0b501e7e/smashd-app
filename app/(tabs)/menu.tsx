import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';

// This will be replaced with actual data from your backend
const SAMPLE_BURGERS = [
  { id: 1, name: 'Classic Burger', price: 9.99, description: 'Our signature beef patty with lettuce and tomato' },
  { id: 2, name: 'Cheese Burger', price: 10.99, description: 'Classic burger with melted cheddar' },
  { id: 3, name: 'Bacon Burger', price: 11.99, description: 'Classic burger with crispy bacon' },
];

export default function MenuScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFE4B5', dark: '#8B4513' }}
      headerImage={
        <ThemedText style={styles.headerText}>Our Menu</ThemedText>
      }>
      <ThemedView style={styles.container}>
        {SAMPLE_BURGERS.map(burger => (
          <ThemedView key={burger.id} style={styles.burgerCard}>
            <ThemedText type="subtitle">{burger.name}</ThemedText>
            <ThemedText>${burger.price}</ThemedText>
            <ThemedText>{burger.description}</ThemedText>
          </ThemedView>
        ))}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 100,
  },
  burgerCard: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
}); 
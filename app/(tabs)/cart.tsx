import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function CartScreen() {
  const { items, removeItem, updateQuantity, total } = useCart();
  const { isLoggedIn } = useAuth();

  const handleCheckout = () => {
    if (!isLoggedIn) {
      router.push('/(auth)/login');
      return;
    }
    router.push('/checkout');
  };

  if (items.length === 0) {
    return (
      <ThemedView style={styles.emptyContainer}>
        <ThemedText style={styles.emptyText}>Your cart is empty</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFE4B5', dark: '#8B4513' }}
      headerImage={
        <ThemedView style={styles.headerContainer}>
          <ThemedText style={[
            styles.headerText, 
            { 
              padding: 20,
              lineHeight: 48,
              height: 100
            }
          ]}>
            Your Cart
          </ThemedText>
        </ThemedView>
      }>
      <ThemedView style={styles.container}>
        {items.map(item => (
          <ThemedView key={item.id} style={styles.cartItem}>
            <ThemedView style={styles.itemInfo}>
              <ThemedText type="subtitle">{item.name}</ThemedText>
              <ThemedText>${item.price.toFixed(2)}</ThemedText>
            </ThemedView>
            
            <ThemedView style={styles.quantityControls}>
              <TouchableOpacity
                onPress={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                style={styles.quantityButton}>
                <ThemedText>-</ThemedText>
              </TouchableOpacity>
              <ThemedText>{item.quantity}</ThemedText>
              <TouchableOpacity
                onPress={() => updateQuantity(item.id, item.quantity + 1)}
                style={styles.quantityButton}>
                <ThemedText>+</ThemedText>
              </TouchableOpacity>
            </ThemedView>

            <TouchableOpacity
              onPress={() => removeItem(item.id)}
              style={styles.removeButton}>
              <ThemedText style={styles.removeButtonText}>Remove</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        ))}

        <ThemedView style={styles.totalContainer}>
          <ThemedText type="subtitle">Total: ${total.toFixed(2)}</ThemedText>
          <TouchableOpacity 
            style={styles.checkoutButton}
            onPress={handleCheckout}>
            <ThemedText style={styles.checkoutButtonText}>
              {isLoggedIn ? 'Proceed to Checkout' : 'Login to Checkout'}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  headerContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cartItem: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  itemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  quantityButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#eee',
  },
  removeButton: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#ff4444',
    borderRadius: 4,
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
  },
  totalContainer: {
    marginTop: 16,
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  checkoutButton: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#0a7ea4',
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

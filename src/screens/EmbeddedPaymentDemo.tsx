import React from "react";
import { View, Text, Pressable, Alert, ScrollView, StyleSheet } from "react-native";
import { useEmbeddedPayment } from "../hooks/useEmbeddedPayment";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EmbeddedPaymentDemo() {
  const {
    embeddedPaymentElementView,
    paymentOption,
    handleConfirm,
    loadingError,
    isProcessing,
    isLoaded,
  } = useEmbeddedPayment({});

  const handleSavePaymentMethod = async () => {
    const result = await handleConfirm();
    if (result.success) {
      Alert.alert("Success", "Payment method saved successfully!");
    } else {
      Alert.alert("Error", result.error || "Failed to save payment method");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {embeddedPaymentElementView}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    position: 'relative',
  },
});

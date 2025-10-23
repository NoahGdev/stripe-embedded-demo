import React from "react";
import { View, Text, Pressable, Alert, ScrollView } from "react-native";
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
    <SafeAreaView className="flex-1 bg-gray-50 relative">
      <View className="p-6" style={{ paddingBottom: 300 }}>

        {embeddedPaymentElementView}

        <Pressable
          onPress={handleSavePaymentMethod}
          disabled={isProcessing || !isLoaded || !paymentOption}
          className={`rounded-lg p-4 ${
            isProcessing || !isLoaded || !paymentOption
              ? "bg-gray-300"
              : "bg-blue-500"
          }`}
        >
          <Text className="text-white font-semibold text-center text-lg">
            {isProcessing ? "Saving..." : "Save Payment Method"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

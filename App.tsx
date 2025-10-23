import React from "react";
import { StatusBar } from "expo-status-bar";
import { AppStripeProvider } from "./src/providers/StripeProvider";
import EmbeddedPaymentDemo from "./src/screens/EmbeddedPaymentDemo";

export default function App() {
  return (
    <AppStripeProvider>
      <StatusBar style="auto" />
      <EmbeddedPaymentDemo />
    </AppStripeProvider>
  );
}

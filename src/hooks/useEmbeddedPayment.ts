import { useState, useCallback, useEffect, useMemo } from "react";
import {
  useEmbeddedPaymentElement,
  IntentConfiguration,
  EmbeddedPaymentElementConfiguration,
  PaymentMethod,
  IntentCreationCallbackParams,
} from "@stripe/stripe-react-native";
import {stripeAppearance} from "../appearance";

export interface UseEmbeddedPaymentProps {
  currencyCode?: string;
}

export const useEmbeddedPayment = ({
  currencyCode = "USD",
}: UseEmbeddedPaymentProps) => {
  const [intentConfig, setIntentConfig] = useState<IntentConfiguration | null>(
    null
  );
  const [elementConfig, setElementConfig] =
    useState<EmbeddedPaymentElementConfiguration | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const confirmHandler = useCallback(
    async (
      paymentMethod: PaymentMethod.Result,
      shouldSavePaymentMethod: boolean,
      intentCreationCallback: (params: IntentCreationCallbackParams) => void
    ) => {
      try {
        // For demo purposes, we'll simulate a server call
        // In production, make a request to your server to create a SetupIntent
        console.log("Creating SetupIntent to save payment method");

        // Simulate server response - replace with actual API call
        const mockClientSecret = "seti_mock_client_secret_" + Date.now();

        intentCreationCallback({ clientSecret: mockClientSecret });
      } catch (error: any) {
        intentCreationCallback({
          error: error.message || "Failed to create setup intent",
        });
      }
    },
    []
  );

  const initialize = useCallback(() => {
    console.log(
      "🔧 DEV: Initializing embedded payment element for setup with currency:",
      currencyCode
    );

    const newIntentConfig: IntentConfiguration = {
      mode: {
        currencyCode,
        setupFutureUsage: 'OffSession'
      },
      confirmHandler,
    };

    const newElementConfig: EmbeddedPaymentElementConfiguration = {
      merchantDisplayName: "Barberflow",
      returnURL: "barberflow://stripe-redirect",
      appearance: stripeAppearance,
      applePay: {
        merchantCountryCode: 'CA'
      }
    };

    console.log("🔧 DEV: Intent config created:", !!newIntentConfig);
    console.log("🔧 DEV: Element config created:", !!newElementConfig);

    setIntentConfig(newIntentConfig);
    setElementConfig(newElementConfig);
  }, [currencyCode, confirmHandler]);

  const {
    embeddedPaymentElementView,
    paymentOption,
    confirm,
    loadingError,
    isLoaded,
  } = useEmbeddedPaymentElement(intentConfig!, elementConfig!);

  useEffect(() => {
    console.log("🔧 DEV: Payment element state changed:");
    console.log(
      "  - embeddedPaymentElementView:",
      !!embeddedPaymentElementView
    );
    console.log("  - isLoaded:", isLoaded);
    console.log("  - loadingError:", loadingError?.message || "none");
    console.log("  - paymentOption:", paymentOption?.label || "none");
  }, [embeddedPaymentElementView, isLoaded, loadingError, paymentOption]);

  const handleConfirm = useCallback(async () => {
    if (!confirm) return { success: false, error: "Payment element not ready" };

    setIsProcessing(true);

    try {
      const result = await confirm();

      switch (result.status) {
        case "completed":
          return { success: true };
        case "failed":
          return { success: false, error: result.error.message };
        case "canceled":
          return { success: false, error: "Payment canceled by user" };
        default:
          return { success: false, error: "Unknown payment status" };
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "Unexpected error occurred",
      };
    } finally {
      setIsProcessing(false);
    }
  }, [confirm]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return {
    embeddedPaymentElementView,
    paymentOption,
    handleConfirm,
    loadingError,
    isProcessing,
    isLoaded,
  };
};

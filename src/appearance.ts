import type { AppearanceParams } from '@stripe/stripe-react-native';
import { RowStyle } from '@stripe/stripe-react-native/src/types/PaymentSheet';

export const stripeAppearance: AppearanceParams = {
  embeddedPaymentElement: {
    row: {
      style: RowStyle.FloatingButton,
    },
  },
};

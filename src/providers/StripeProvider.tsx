import { StripeProvider } from "@stripe/stripe-react-native";

export const AppStripeProvider = ({
  children,
}: {
  children: any;
}) => {
  const publishableKey = "pk_test_51SFUAPE8ryMvWEVuIrnvMMYsmj3sACOaetM92dae6kTTpqnFZCUOeeBsmyvhYtkb12XxY7IMPCCxWVcrCzfbIJ6j00uMqZJnq3"

  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="com.barberflow.customer"
      urlScheme="barberflow://"
      stripeAccountId="acct_1SFUpqE0yA6Jfbg1"
    >
      {children}
    </StripeProvider>
  );
};

const getEnvironmentVariable = (environmentVariable: string): string => {
    if (!process.env[environmentVariable]) {
      throw new Error(
        `Couldn't find environment variable: ${environmentVariable}`
      );
    } else {
      return process.env[environmentVariable]!;
    }
  };

export const config = {
  plaidClientId: getEnvironmentVariable("PLAID_CLIENT_ID"),
  plaidSecret: getEnvironmentVariable("PLAID_SECRET"),
  plaidVersion: getEnvironmentVariable("PLAID_VERSION"),
};
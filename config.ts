function getEnvVariable(variableName: string) {
    const environmentVariable = process.env[variableName];
    if (!environmentVariable) {
        throw new Error(`Environment variable ${variableName} is not set`);
    }
    return environmentVariable;
}

const config = {
    plaidClientId: getEnvVariable('PLAID_CLIENT_ID'),
}

export const getConfig = () => config;
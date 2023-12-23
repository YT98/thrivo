"use client"

import plaidLinkSuccessAction from "@/actions/plaid/plaid-link-success-action";
import { LinkTokenCreateResponse } from "plaid";
import { PlaidLinkOptions, usePlaidLink } from "react-plaid-link";

interface IPlaidLinkWrapperProps {
    linkToken: LinkTokenCreateResponse;
}

const PlaidLinkWrapper = (props: IPlaidLinkWrapperProps) => {
    const { linkToken } = props;
    const config: PlaidLinkOptions = {
        token: linkToken.link_token,
        onSuccess: (public_token, metadata) => {
            const plaidLinkSuccessActionResponse = plaidLinkSuccessAction(public_token, metadata);
        },
        onExit: (err, metadata) => {
            // TODO: do something with err
        }
      };
    const { open, ready, error, exit } = usePlaidLink(config);

    return (
        <div>
            <h1>Plaid Link Wrapper</h1>
            <button onClick={() => open()} disabled={!ready}>
                Connect a bank account
            </button>
        </div>
    )
}

export default PlaidLinkWrapper;
export { PlaidLinkWrapper };
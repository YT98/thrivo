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
            console.log("success");
            const plaidLinkSuccessActionResponse = plaidLinkSuccessAction(public_token);
            console.log(plaidLinkSuccessActionResponse);
        },
        onExit: (err, metadata) => {
            console.log("exit");
            console.log(err);
            console.log(metadata);
        },
        onEvent: (eventName, metadata) => {
            console.log("event");
            console.log(eventName);
            console.log(metadata);
        },
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
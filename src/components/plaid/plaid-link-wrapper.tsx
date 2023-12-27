"use client"

import plaidLinkSuccessAction from "@/actions/plaid/plaid-link-success-action";
import { LinkTokenCreateResponse } from "plaid";
import { PlaidLinkOptions, usePlaidLink } from "react-plaid-link";

interface IPlaidLinkWrapperProps {
    linkToken: LinkTokenCreateResponse;
    buttonLabel: string;
}

const PlaidLinkWrapper = (props: IPlaidLinkWrapperProps) => {
    const { linkToken, buttonLabel } = props;

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
        <button className="btn" onClick={() => open()} disabled={!ready}>
            {buttonLabel}
        </button>
    )
}

export default PlaidLinkWrapper;
export { PlaidLinkWrapper };
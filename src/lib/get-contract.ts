import { Address, getContract as thirdwebGetContract, Chain } from "thirdweb";
import {client} from "@/lib/thirdwebClient";
import { optimism } from "thirdweb/chains";

type GetContractOptions = {
    address: Address;
    chain?: Chain;
};

export default function getContract(options: GetContractOptions) {
    return thirdwebGetContract({
        client,
        chain: optimism,
        address: options.address,
    });
}
import Token from "@/types/token"
import { Address} from "thirdweb"
import getContract from "@/lib/get-contract";
import { approve as ThirdwebApprove } from "thirdweb/extensions/erc20";


type ApproveOptions ={
    token: Token,
    amount: bigint,
    spender: Address
}

export default function approve(options: ApproveOptions){
    const contract =getContract({
        address: options.token.address
    });

    return ThirdwebApprove({
        contract,
        spender: options.spender,
        amountWei: options.amount
    })
}

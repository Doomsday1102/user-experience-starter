import { ROUTER_CONTRACT } from "@/constants";
import Token from "@/types/token";
import { Address, PreparedTransaction } from "thirdweb";
import { getUniswapV3Pool, exactInputSingle } from "thirdweb/extensions/uniswap";



type SwapPtions ={
    inputToken: Token;
    inputAmount: bigint;
    outputToken: Token;
    recipient: Address;
    fee: number;
    deadline?: bigint;
}

export default function Swap(options: SwapPtions): PreparedTransaction{
    return exactInputSingle({
        contract: ROUTER_CONTRACT,
        params: {
            tokenIn: options.inputToken.address,
            tokenOut: options.outputToken.address,
            fee: options.fee,
            recipient: options.recipient,
            deadline: options.deadline ?? BigInt(Math.floor(Date.now()/1000)+60*20), // Def 20 minutes
            amountIn: options.inputAmount,
            amountOutMinimum: BigInt(0),
            sqrtPriceLimitX96: BigInt(0),
        }
    })
}
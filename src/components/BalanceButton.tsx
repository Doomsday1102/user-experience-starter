"use client"

type Props = { contractAddress: string };
import { getContract} from "thirdweb";
import { optimism } from "thirdweb/chains";
import { client } from "@/lib/thirdwebClient";
import { useEffect, useMemo, useState } from "react";
import { useActiveAccount} from "thirdweb/react";
import { readContract } from "thirdweb";


export default function BalanceButton (props: Props){
   

    const contract =useMemo(
        ()=>
            getContract({
                client,
                chain: optimism,
                address: "0x5Be2eEe4D534298C6F089479c904D6edA18F28F0",
            }),
            []
    );

    const address = useActiveAccount();
    const [balance, setBalance] = useState(0n);
    const [checkBalanceClicked, setCheckBalanceClicked] = useState(false);

    useEffect(() => {
        if (checkBalanceClicked) {
          async function run() {
            console.log(address?.address);
            if (address?.address) {
              const balance = await readContract({
                contract: contract,
                method: "function balanceOf(address) view returns (uint256)",
                params: [address?.address],
              });
              console.log("balance");
              console.log(balance);
              setBalance(balance);
            }
          }
    
          run();
          setCheckBalanceClicked(false); // Reset state if you want to allow subsequent clicks
        }
      }, [checkBalanceClicked, address?.address, contract]);

      console.log("Leyendo balance")
      return (
        <div>
          
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              console.log("check balance");
              setCheckBalanceClicked(true);
            }}
          >
            Check Balance
          </button>
    
          <p>balance: {balance.toString()}</p>
        </div>
      );
}
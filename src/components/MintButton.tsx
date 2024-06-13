"use client";

type Props = { contractAddress: string };
import { getContract, prepareContractCall } from "thirdweb";

import { optimism } from "thirdweb/chains";
import { client } from "@/lib/thirdwebClient";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { parseUnits } from "ethers";
import { readContract } from "thirdweb";

export default function MintButton(props: Props) {
  const {
    mutate: sendTransaction,
    data,
    error,
    status,
    failureReason,
  } = useSendTransaction();

  // get a contract
  const contract = useMemo(
    () =>
      getContract({
        // the client you have created via `createThirdwebClient()`
        client,
        // the chain the contract is deployed on
        chain: optimism,
        // the contract's address
        address: "0x5Be2eEe4D534298C6F089479c904D6edA18F28F0",
      }),
    []
  );
 

  const address = useActiveAccount();
  const [balance, setBalance] = useState(0n);
  const [nextButtonClicked, setNextButtonClicked] = useState(false);
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

  const onClick = useCallback(async () => {
    const transaction = prepareContractCall({
      contract,
      method: "function mint(address to, uint256 amount)",
      params: [
        "0x5be2eee4d534298c6f089479c904d6eda18f28f0",
        parseUnits("10.5", 18),
      ],
    });
    sendTransaction(transaction);
  }, [contract, sendTransaction]);

  console.log(data);
  console.log(error);
  console.log(failureReason);
  console.log(status);

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          console.log("here");
          onClick();
        }}
      >
        mint button
      </button>
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

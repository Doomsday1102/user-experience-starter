"use client"

import React from "react";
import { ConnectButton as ThirdWebConnectButton, useActiveWalletChain } from "thirdweb/react";
import {createWallet} from "thirdweb/wallets"
import { client } from "@/lib/thirdwebClient";
import { optimism } from "thirdweb/chains";

export default function ConnectButton(){
    const wallets =[
        createWallet("io.metamask"),
        createWallet("com.coinbase.wallet"),
        createWallet("me.rainbow"),
    ];
    return (
        <ThirdWebConnectButton
         connectButton={{className: "w-full"}} 
         theme="light" 
         chain={optimism} 
         client={client} 
         wallets={wallets}/>
    )
}
import getContract from "./lib/get-contract";
import Token from "./types/token";

export const tokens: { [id: string]: Token } = {
  "weth": {
    address: "0x4200000000000000000000000000000000000006",
    symbol: "WETH",
    decimals: 18,
    image: "https://assets.coingecko.com/coins/images/2518/standard/weth.png?1696503332"
  },
  "usdc": {
    address: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
    symbol: "USDC",
    decimals: 6,
    image: "https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694"
  },
  "usdt": {
    address: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
    symbol: "USDT",
    decimals: 6,
    image: "https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661"
  }
}

export const ROUTER = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
export const FACTORY = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
export const QUOTER = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6"

export const ROUTER_CONTRACT = getContract({ address: ROUTER });
export const FACTORY_CONTRACT = getContract({ address: FACTORY });
export const QUOTER_CONTRACT = getContract({ address: QUOTER });
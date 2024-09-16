type Asset = {
  attributes?: {
    [key: string]: string;
  };
  balance: number;
  change?: {
    "24h": number;
    "7d"?: number;
    "30d"?: number;
  };
  collection?: {
    address: string;
    description?: string;
    image?: string;
    name?: string;
    symbol?: string;
    url?: string;
  };
  description?: string;
  id: string;
  image?: string;
  name: string;
  pnl?: number;
  price?: {
    currency: string;
    perToken: number;
    value: number;
  };
  type: "token" | "nft";
  token?: {
    associatedTokenAddress?: string;
    decimals: number;
    program?: string;
    supply?: number;
    symbol: string;
  };
};

type Account = {
  id: string;
  name?: string;
  type: "wallet" | "exchange" | "pool";
  platform: string;
};

type Portfolio = {
  assetBreakdown: { name: string; value: number }[];
  assets: {
    tokens: Asset[];
    nfts: Asset[];
  };
  description: string;
  id: string;
  netWorth?: number;
  title: string;
  accounts: string[];
};

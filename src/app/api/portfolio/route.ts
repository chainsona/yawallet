import dotenv from "dotenv";
dotenv.config();

import { extractUrlParams } from "@/app/utils/web";

function getType(value: string) {
  switch (value) {
    case "FungibleToken":
    case "FungibleAsset":
      return "token";
    case "ProgrammableNFT":
    case "V1_NFT":
    case "Custom":
      return "nft";
    default:
      return;
  }
}

export async function GET(request: Request) {
  console.debug("GET /api/portfolio");

  const params = extractUrlParams(request.url);

  if (!params.id?.value) {
    console.error("Invalid ID.");
    return Response.json(
      {
        error: "Invalid ID.",
      },
      {
        status: 400,
      }
    );
  }

  const items: any[] = [];

  let solToken: Asset | undefined = undefined;

  let i = 1;
  do {
    const response = await fetch(process.env.RPC_ENDPOINT || "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "my-id",
        method: "searchAssets",
        params: {
          ownerAddress: params.id.value,
          tokenType: "all",
          displayOptions: {
            showNativeBalance: true,
            showInscription: true,
            showCollectionMetadata: true,
          },
          page: i++,
          limit: 100,
        },
      }),
    });
    const { result } = await response.json();

    if (!result?.items || result.items?.length === 0) {
      break;
    }

    if (result?.nativeBalance) {
      solToken = {
        balance: result?.nativeBalance?.lamports / 10 ** 9,
        id: "So11111111111111111111111111111111111111112",
        image:
          "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        name: "SOL",
        type: "token",
        price: {
          currency: "USD",
          perToken: result?.nativeBalance?.price_per_sol,
          value: result?.nativeBalance?.total_price,
        },
        token: {
          decimals: 9,
          symbol: "SOL",
        },
      };
    }

    items.push(...result.items);
  } while (i < 10);

  // console.debug(`items ${JSON.stringify(items)}`);

  const assets = items.reduce((acc, item) => {
    if (!acc.tokens) {
      acc.tokens = [];
    }

    if (!acc.nfts) {
      acc.nfts = [];
    }

    const type = getType(item.interface);

    if (!type) {
      console.error(`Invalid asset type:'${JSON.stringify(item)}'.`);
      throw new Error(`Invalid asset type:'${type}'.`);
    }

    const asset: Asset = {
      attributes: (item.content?.metadata?.attributes || []).reduce(
        (acc: any, attribute: any) => {
          acc[attribute.trait_type] = attribute.value;
          return acc;
        },
        {}
      ),
      balance:
        type === "token"
          ? item.token_info?.balance / 10 ** item.token_info?.decimals
          : 1,
      change: undefined,
      collection: item.grouping?.[0]
        ? {
            address: item.grouping?.[0].group_value,
            description: item.grouping?.[0].collection_metadata?.description,
            image: item.grouping?.[0].collection_metadata?.image,
            name: item.grouping?.[0].collection_metadata?.name,
            symbol: item.grouping?.[0].collection_metadata?.symbol,
            url: item.grouping?.[0].collection_metadata?.external_url,
          }
        : undefined,
      description: item.content.metadata.description,
      id: item.id,
      image: item.content?.files?.[0]?.uri || item.content?.files?.[0]?.cdn_uri,
      name: item.content.metadata.name,
      pnl: undefined,
      price:
        type === "token"
          ? {
              currency: item.token_info?.price_info?.currency,
              perToken: item.token_info?.price_info?.price_per_token,
              value: item.token_info?.price_info?.total_price,
            }
          : undefined,
      token: {
        associatedTokenAddress: item.token_info?.associated_token,
        decimals: item.token_info?.decimals,
        program: item.token_info?.token_program,
        supply: item.token_info?.supply,
        symbol: item.token_info?.symbol,
      },
      type: type,
    };

    if (type === "token") {
      acc.tokens.push(asset);
    } else if (type === "nft") {
      acc.nfts.push(asset);
    }

    return acc;
  }, {});

  if (!!solToken) {
    assets.tokens.push(solToken);
  }

  // Sort assets by value (desc)
  assets.tokens = assets.tokens.sort((a: Asset, b: Asset) => {
    return a.price && b.price
      ? (b.price?.value || 0) - (a.price?.value || 0)
      : 1;
  });

  const tokensValue = assets.tokens.reduce((acc: number, token: Asset) => {
    if (token.price) {
      return acc + (token.price?.value || 0);
    }
    return acc;
  }, 0);

  // Group NFTs from same collection
  const nfts = assets.nfts
    .reduce((acc: Asset[], nft: Asset) => {
      const index = acc.findIndex(
        (item) =>
          item.collection?.address &&
          item.collection?.address === nft.collection?.address
      );

      const balance = Object.keys(nft.attributes || {}).includes("Amount")
        ? parseFloat(nft.attributes?.Amount || "1")
        : nft.balance;
      // if (balance > 1) {
      //   console.debug(`NFT balance: ${balance}`);
      // }

      if (index === -1) {
        acc.push({ ...nft, balance });
      } else {
        acc[index].balance += balance;
        acc[index].name = acc[index].collection?.name || acc[index].name;
      }

      return acc;
    }, [])
    .sort((a: Asset, b: Asset) => {
      return b.name.localeCompare(a.name);
    });

  const portfolio = {
    assets: { ...assets, ...nfts },
    assetBreakdown: [
      {
        name: "Tokens",
        value: tokensValue,
      },
    ],
    netWorth: tokensValue,
    accounts: [
      {
        id: "1",
        type: "wallet",
        platform: "Solana",
      },
    ],
  };

  return Response.json({
    data: portfolio,
  });
}

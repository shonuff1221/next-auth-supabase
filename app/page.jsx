import Image from 'next/image'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link';

async function getTokenData() {
  const token_address = "0x3AD3076AfB560f725e87483Aa63883A763Cd4E98";
  const tokenUrl =
    `https://api.dexscreener.io/latest/dex/tokens/${token_address}`;
  const response = await fetch(tokenUrl);
  const tokenData = await response.json();
  console.log(tokenData);
  return tokenData;
}
async function getPairData() {
  const pair_address = "0x935AEb3445e3805Ae671639563A48dc50e622595";
  const pairUrl =
    `https://api.dexscreener.com/latest/dex/pairs/bsc/${pair_address}`;
  const response = await fetch(pairUrl);
  const pairData = await response.json();
  console.log(pairData);
  return pairData;
}
export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({cookies: () => cookieStore});

  const {data: {user}} = await supabase.auth.getUser()
  const token = await getTokenData();
  const pair = await getPairData();

  if (!user){
    return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Link href={'/login'}>
          You are not logged in. Click here to go login.
        </Link>
      </main>
    )
  }

  return (
   <>
   <h1>Token Info </h1>
      <div>
        <h1>token Chain ID {token.pairs[0].chainId}</h1>
        <h1>token Dex ID {token.pairs[0].dexId}</h1>
        <h1>token URL {token.pairs[0].url}</h1>
        <h1> token pair address {token.pairs[0].pairAddress}</h1>
        <h1> token base token address {token.pairs[0].baseToken.address}</h1>
        <h1>token base token name {token.pairs[0].baseToken.name}</h1>
        <h1>token base token symbol {token.pairs[0].baseToken.symbol}</h1>
        <h1>token quote token address {token.pairs[0].quoteToken.symbol}</h1>
        <h1>token price native {token.pairs[0].priceNative} BNB</h1>
        <h1>token price usd {token.pairs[0].priceUsd}$</h1>
        <h1>token buys last 5 mins {token.pairs[0].txns.m5.buys}</h1>
        <h1>token sells last 5 mins {token.pairs[0].txns.m5.sells}</h1>
        <h1>token h1 buys {token.pairs[0].txns.h1.buys}</h1>
        <h1> token h1 sells {token.pairs[0].txns.h1.sells}</h1>
        <h1>token h6 buys {token.pairs[0].txns.h6.buys}</h1>
        <h1>token h6 sells {token.pairs[0].txns.h6.sells}</h1>
      </div>
   </>
  )
}

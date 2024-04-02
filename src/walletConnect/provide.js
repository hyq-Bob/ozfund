import Store from "@/store";
import WalletConnectProvider from "@walletconnect/web3-provider";
import * as operCookie from '@/utils/auth'
// import WalletConnect from "@walletconnect/client";
// import QRCodeModal from "@walletconnect/qrcode-modal";
// export const connector = new WalletConnect({
//   // bridge: "https://bridge.walletconnect.org", // Required
//   bridge: "https://bsc-dataseed.binance.org",
//   qrcodeModal: QRCodeModal,
//   qrcodeModalOptions : {
//     mobileLinks : [
//       "metamask" ,
//       "imtoken" ,
//       "tokenpocket" ,
//       "trust" ,
//       "pillar" ,
//     ]
//   }
// });



export const provider = new WalletConnectProvider({
  infuraId: "e756f9eb59584c58a30646151dc04797",
  rpc: {
    1: 'https://bsc-dataseed.binance.org/', // 币安的链用这个
    2: "https://mainnet.infura.io/v3/e756f9eb59584c58a30646151dc04797",
    3: "https://rinkeby.infura.io/v3/e756f9eb59584c58a30646151dc04797",
    4: 'https://bsc-dataseed1.defibit.io/',
    5: 'https://bsc-dataseed1.ninicoin.io/',
    6: "https://exchainrpc.okex.org",
    56: "https://bsc-dataseed.binance.org/"
  },
  chainId: 56,
  qrcodeModalOptions : {
    desktopLinks: [
      'ledger',
      'tokenary',
      'wallet',
      'wallet 3',
      'secuX',
      'ambire',
      'wallet3',
      'apolloX',
      'zerion',
      'sequence',
      'punkWallet',
      'kryptoGO',
      'nft',
      'riceWallet',
      'vision',
      'keyring'
    ],
    mobileLinks : [
      "metamask" ,
      "imtoken" ,
      "tokenpocket" ,
      "trust" ,
// https://juejin.cn/post/7045113730648145950
      "pillar" ,
    ]
  }
});

// Subscribe to accounts change
provider.on("accountsChanged", (accounts) => {
  console.log(accounts, 'accountsChanged');
  Store.commit("Wallet/SAVE_WALLET_INFO", { key: "address", value: accounts[0] });
  if (accounts[0]) {
    operCookie.setToken('WALLET_ADDRESS', accounts[0])
  }
});

// Subscribe to chainId change
provider.on("chainChanged", (chainId) => {
  console.log(chainId, 'chainChanged');
  Store.commit("Wallet/SAVE_WALLET_INFO", { key: "chainId", value: chainId });
});

// Subscribe to session disconnection
provider.on("disconnect", (code, reason) => {
  console.log(code, reason, 'disconnect');
});


// https://docs.walletconnect.com/quick-start/dapps/client
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { apiGetAccountAssets } from '@/api/wallet'

export const connect = async () => {
  // const bridge = "https://bridge.walletconnect.org";
  const bridge = "https://bsc-dataseed.binance.org";
  const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
  // check if already connected
  if (!connector.connected) {
    // create new session
    await connector.createSession(connector);
  }
  if (!connector) return
  connector.on("session_update", async (error, payload) => {
    console.log(`connector.on("session_update")`);
    if (error) {
      throw error;
    }
    const { chainId, accounts } = payload.params[0];
    console.log(chainId, accounts, 'session_update')
    // this.onSessionUpdate(accounts, chainId);
  });

  connector.on("connect", (error, payload) => {
    console.log(`connector.on("connect")`, payload);
    const { accounts, chainId } = payload.params[0]
    apiGetAccountAssets(accounts[0], chainId).then(res => {
      console.log(res, 'axios获取余额')
    })
    if (error) {
      throw error;
    }

    // this.onConnect(payload);
  });

  connector.on("disconnect", (error, payload) => {
    console.log(`connector.on("disconnect")`, payload);

    if (error) {
      throw error;
    }

    // this.onDisconnect();
  });

  if (connector.connected) {
    const { chainId, accounts } = connector;
    const address = accounts[0];
    console.log(address, chainId, '1')

    // this.setState({
    //   connected: true,
    //   chainId,
    //   accounts,
    //   address,
    // });
    // this.onSessionUpdate(accounts, chainId);
  }
}

export default connect
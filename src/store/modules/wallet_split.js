import { ethers } from "ethers";
import ozcoinExpandAbi from "@/abi/ozcoinExpandAbi.json";
import erc20Abi from "@/abi/erc20Abi.json";
// import ozcoinStakeExpandAbi from "@/abi/ozcoinStakeExpandAbi.json";
import { getProvider, EthTransactionWei,BigNumberToNum } from "@/utils/metamask.js";
const state = {
  busdAddr: process.env.VUE_APP_BUSD_ADDR,
  ozcoinAddr: process.env.VUE_APP_OZCOIN_ADDR,
  totoAddr: process.env.VUE_APP_TOTO_ADDR,
  usdtAddr: process.env.VUE_APP_USDT_ADDR,
  ozcMarketCap:0,
  totoMarketCap:0,
  totoDestroy:0,
  destroyOzc:0
};
const getters = {
  getOzcMarketCap: state => state.ozcMarketCap
};
const mutations ={
  updateOzcMarketCap(state, payload){
    state.ozcMarketCap = payload.value
  },
  updateTotoMarketCap(state, payload){
    state.totoMarketCap = payload.value
  },
  updateTotoDestroy(state, payload){
    state.totoDestroy = payload.value
  },
  destroyOzcCirculatingSupply(state, payload){
    state.destroyOzc = payload.value
  }
}
const actions = {
  // USDT 转 OZC
  async approveAndExchange({ state }, { amount, gasLimit = 1000000 }) {
    // 连接到 Metamask 提供的以太坊 provider
    const provider = await getProvider();
    // 以太坊钱包地址
    const signer = provider.getSigner();
    const exchangeAddr = await signer.getAddress();
    // usdt合约地址
    const ozcContractAddress = state.usdtAddr;
    // usdt合约 ABI
    const usdtContractABI = erc20Abi;
    // 加载代币合约
    const tokenContract = new ethers.Contract(
      ozcContractAddress,
      usdtContractABI,
      signer
    );
    const exchangeContract = new ethers.Contract(
      state.ozcoinAddr,
      ozcoinExpandAbi,
      signer
    );

    // 设置允许的最大额度（通常是 uint256 的最大值）
    // const amountToApprove = ethers.constants.MaxUint256;
    const amountToApprove = EthTransactionWei(amount);
    // 调用代币合约的 approve 方法进行授权
    const approveTx = await tokenContract.approve(
      state.ozcoinAddr,
      amountToApprove
    );
    await approveTx.wait();
    console.log("Token approval transaction hash:", approveTx.hash);
    // 在批准后执行兑换
    try {
      const exchangeTx = await exchangeContract.exchange(
        exchangeAddr,
        state.usdtAddr,
        amountToApprove,
        {
          gasLimit: ethers.utils.hexlify(gasLimit),
        }
      );
      await exchangeTx.wait();
      return Promise.resolve({ success: true, data: exchangeTx });
    } catch (error) {
      return Promise.reject({ success: false, data: error });
    }
  },
  // OZC 转 USDT
  async ozcExchangeUsdt({ state }, { amount, gasLimit = 1000000 }) {
    // 连接到 Metamask 提供的以太坊 provider
    const provider = await getProvider();
    // 以太坊钱包地址
    const signer = provider.getSigner();
    const exchangeAddr = await signer.getAddress();
    const amountToApprove = EthTransactionWei(amount);
    const exchangeContract = new ethers.Contract(
      state.ozcoinAddr,
      ozcoinExpandAbi,
      signer
    );
    try {
      const exchangeTx = await exchangeContract.reverseExchange(
        exchangeAddr,
        state.busdAddr,
        amountToApprove,
        {
          gasLimit: ethers.utils.hexlify(gasLimit),
        }
      );
      await exchangeTx.wait();
      return Promise.resolve({ success: true, data: exchangeTx });
    } catch (error) {
      return Promise.reject({ success: false, data: error });
    }
  },
  // OZC 市值(发行量)
  async ozcPublish({state, commit}){
     // 连接到 Metamask 提供的以太坊 provider
     const provider = await getProvider();
     // 以太坊钱包地址
     const signer = provider.getSigner();
     const exchangeContract = new ethers.Contract(
      state.ozcoinAddr,
      erc20Abi,
      signer
    );
    try {
      let {_hex,_isBigNumber } = await exchangeContract.totalSupply()
      let res = _isBigNumber ? BigNumberToNum(_hex) : 0
      commit('updateOzcMarketCap',{value:res} )
      return Promise.resolve({success:true, data: res})
    } catch (error) {
      console.log('error: ', error);
      return Promise.resolve({success:false, data: error})
    }
  },
  // ozc 销毁
  async circulatingSupplyFn({state, commit}){

     // 连接到 Metamask 提供的以太坊 provider
     const provider = await getProvider();
     // 以太坊钱包地址
     const signer = provider.getSigner();
     const exchangeContract = new ethers.Contract(
      state.ozcoinAddr,
      erc20Abi,
      signer
    );
    try {
      let {_hex,_isBigNumber } = await exchangeContract.balanceOf(state.ozcoinAddr)
      let res = _isBigNumber ? BigNumberToNum(_hex) : 0
      commit('destroyOzcCirculatingSupply',{value:res} )
      return Promise.resolve({success:true, data: res})
    } catch (error) {
      console.log('error: ', error);
      return Promise.resolve({success:false, data: error})
    }
  
  },
  // toto市值
  async totoPublish({state, commit}){
    // 连接到 Metamask 提供的以太坊 provider
    const provider = await getProvider();
    // 以太坊钱包地址
    const signer = provider.getSigner();
    const exchangeContract = new ethers.Contract(
     state.totoAddr,
     erc20Abi,
     signer
   );
   try {
     let {_hex,_isBigNumber } = await exchangeContract.totalSupply()
     let res = _isBigNumber ? BigNumberToNum(_hex) : 0
     commit('updateTotoMarketCap',{value:res} )
     return Promise.resolve({success:true, data: res})
   } catch (error) {
     console.log('error: ', error);
     return Promise.resolve({success:false, data: error})
   }
 },
//  销毁
 async totoDestroyed({state, commit}){
   // 连接到 Metamask 提供的以太坊 provider
   const provider = await getProvider();
   // 以太坊钱包地址
   const signer = provider.getSigner();
   const exchangeContract = new ethers.Contract(
    state.totoAddr,
    erc20Abi,
    signer
  );
  try {
    let {_hex,_isBigNumber } = await exchangeContract.balanceOf(state.ozcoinAddr)
    let res = _isBigNumber ? BigNumberToNum(_hex) : 0
    commit('updateTotoDestroy',{value:res} )
    return Promise.resolve({success:true, data: res})
  } catch (error) {
    console.log('error: ', error);
    return Promise.resolve({success:false, data: error})
  }
 }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

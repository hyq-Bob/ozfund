/*
 * @Author: hyq_bob bob.he@autech.one
 * @Date: 2024-03-25 18:53:19
 * @LastEditors: heyongqiang 1498833800@qq.com
 * @LastEditTime: 2024-04-03 01:00:34
 * @FilePath: /ozfund-mobile/src/store/modules/metamask.js
 * @Description: 钱包相关操作
 */
import { ethers } from "ethers";
// import Web3 from "web3";
import ozcoinExpandAbi from "@/abi/ozcoinExpandAbi.json";
import erc20Abi from "@/abi/erc20Abi.json";
import totoAbi from "@/abi/totoExpandAbi.json";
import ozcoinStakeExpandAbi from "@/abi/ozcoinStakeExpandAbi.json";
import {
  getProvider,
  isValidAddress,
  Erc20Transaction,
  EthTransactionWei,
  signatureByEIP712,
  BigNumberToNum,
} from "@/utils/metamask.js";
const state = {
  busdAddr: process.env.VUE_APP_BUSD_ADDR,
  ozcoinAddr: process.env.VUE_APP_OZCOIN_ADDR,
  totoAddr: process.env.VUE_APP_TOTO_ADDR,
  stakeAddr:process.env.VUE_APP_STAKE_ADDR
};
const getters = {};
const actions = {
  // 这个函数用于检查是否连接到钱包
  async checkIfWalletIsConnected() {
    let accounts = [];
    // 检查window.ethereum是否可用
    if (window.ethereum) {
      try {
        // 使用ethers.js请求账户信息
        let provider = await getProvider()
        accounts = await provider.listAccounts();
        console.log('accounts: ', accounts);
      } catch (error) {
        console.error("Error fetching accounts: ", error);
      }
    } else {
      console.log("Please install MetaMask!");
    }
    // 检查是否获取到了账户
    return accounts.length > 0 ? accounts[0] : null;
  },
  //  TOTO 兑换 OZC
  async exchangeTOTOforOzcoin({ state }, { amount, exchangeAddr, gasLimit = 1000000 }) {
    let addressValidate = isValidAddress(exchangeAddr);
    if (!addressValidate) return;
    let provider = await getProvider()
    const signer = provider.getSigner(); // 签名
    // 智能合约地址和ABI
    const exchangeContractAddress = state.ozcoinAddr;
    const exchangeContractABI = ozcoinExpandAbi;
    // 创建合约实例
    const exchangeContract = new ethers.Contract(exchangeContractAddress, exchangeContractABI, signer);
    // 调用兑换函数
    try {
      const tx = await exchangeContract.exchange(exchangeAddr, exchangeContractAddress, Erc20Transaction(amount.toString()), {
        gasLimit: ethers.utils.hexlify(gasLimit) // 设置为1000000，你需要根据实际情况调整这个值
      });
      await tx.wait(); // 等待交易确认
      return Promise.resolve({ success: true })
    } catch (error) {
      return Promise.resolve({ success: false })
    }
    // console.log(`交易成功！交易哈希：${tx.hash}`);
  },
  //  USDT 兑换 OZC
  async exchangeUsdtForOzc({ state }, { amount, exchangeAddr, gasLimit = 1000000 }) {
    let addressValidate = isValidAddress(exchangeAddr);
    if (!addressValidate) return;
    let provider = await getProvider()
    const signer = provider.getSigner(); // 签名
    // 智能合约地址和ABI
    const exchangeContractAddress = state.ozcoinAddr;
    const exchangeContractABI = ozcoinExpandAbi;
    // 创建合约实例
    const exchangeContract = new ethers.Contract(exchangeContractAddress, exchangeContractABI, signer);
    // 调用兑换函数
    try {
      const tx = await exchangeContract.exchange(exchangeAddr, exchangeContractAddress, Erc20Transaction(amount.toString()), {
        gasLimit: ethers.utils.hexlify(gasLimit) // 设置为1000000，你需要根据实际情况调整这个值
      });
      await tx.wait(); // 等待交易确认
      return Promise.resolve({ success: true })
    } catch (error) {
      return Promise.resolve({ success: false })
    }
  },
  //  OZC 兑换 USDT
  async exchangeOzcForUsdt({ state }, { amount, exchangeAddr, gasLimit = 1000000 }) {
    let addressValidate = isValidAddress(exchangeAddr);
    if (!addressValidate) return;
    let provider = await getProvider()
    const signer = provider.getSigner(); // 签名
    // 智能合约地址和ABI
    const exchangeContractAddress = state.busdAddr;
    const exchangeContractABI = erc20Abi;
    // 创建合约实例
    const exchangeContract = new ethers.Contract(exchangeContractAddress, exchangeContractABI, signer);
    // 调用兑换函数
    try {
      const tx = await exchangeContract.exchange(exchangeAddr, exchangeContractAddress, Erc20Transaction(amount.toString()), {
        gasLimit: ethers.utils.hexlify(gasLimit) // 设置为1000000，你需要根据实际情况调整这个值
      });
      await tx.wait();
      return Promise.resolve({ success: true })
    } catch (error) {
      return Promise.resolve({ success: false })
    }// 等待交易确认
  },
  // 质押
  async stakeCoin({ state }, { amount, stakeAddr, gasLimit = 1000000 }) {
    let addressValidate = isValidAddress(stakeAddr);
    if (!addressValidate) return Promise.reject('address is null');
    let provider = await getProvider()
    const signer = provider.getSigner(); // 签名
    // 智能合约地址和ABI
    const stakingContractAddress = state.ozcoinAddr;
    const stakingContractABI = ozcoinStakeExpandAbi;
    // 创建合约实例
    const stakingContract = new ethers.Contract(stakingContractAddress, stakingContractABI, signer);
    // 调用质押函数
    try {
      const tx = await stakingContract.stakeAlone(EthTransactionWei(amount), {
        gasLimit: ethers.utils.hexlify(gasLimit) // 设置为1000000，你需要根据实际情况调整这个值
      });
      await tx.wait();
      console.log('质押成功！');
      return Promise.resolve({ success: true })
    } catch (error) {
      console.error('质押失败：', error);
      return Promise.resolve({ success: false })
    }// 等待交易确认
  },
  // 质押2
  async stakeCoin2({ state }, { amount, stakeAddr, gasLimit = 100000 }) {
    const provider = await getProvider()
    const signer = provider.getSigner();
    if(!stakeAddr){
      stakeAddr = await signer.getAddress();
    }
    const val = EthTransactionWei(amount);
    const contract = new ethers.Contract(state.ozcoinAddr,erc20Abi,signer)
    let deadline = new Date().getTime() + 360000;
    const nonce1 = await contract.nonces(stakeAddr)

    const hexString = ethers.utils.hexlify(nonce1);
    console.log("Hex String:", hexString);
    
    // 将十六进制字符串转换为BigNumber对象
    const bigNumber = ethers.BigNumber.from(hexString);
    console.log("BigNumber:", bigNumber);
    
    // 将BigNumber对象转换为JavaScript原生的数字类型（uint256）
    const nonce = bigNumber.toNumber();
    console.log('nonce: ', nonce);


    // const stakingContract1 = new ethers.Contract(state.totoAddr, totoAbi, signer);
  //  let a =  await stakingContract1.ozcoinStake()
  //  console.log('a>>>>: ', a);

 // 智能合约地址和ABI
 const stakingContractAddress = state.stakeAddr;  // 链地址
 const stakingContractABI = ozcoinStakeExpandAbi;
let chainId = await ethereum.request({ method: "eth_chainId" });
    let signature = await signatureByEIP712(
      'ozcoin',
      state.ozcoinAddr, // ozc链地址
      stakeAddr, // 调用者地址
      stakingContractAddress, //质押链
      val, // 质押数据
      deadline,
      chainId,
      nonce)
    let r = signature.slice(0, 66);
    console.log('r: ', r);
    let s = "0x" + signature.slice(66, 130);
    console.log('s: ', s);
    let v = "0x" + signature.slice(130, 132);
    console.log('v: ', v);
   
    // 创建合约实例
    const stakingContract = new ethers.Contract(stakingContractAddress, stakingContractABI, signer);
    try {
      const tx = await stakingContract.stake(val,nonce, deadline, v, r, s, {
        gasLimit: ethers.utils.hexlify(gasLimit)
      });
      await tx.wait();
      console.log('质押成功！');
      return Promise.resolve({ success: true , data:tx})
    } catch (error) {
      console.error('质押失败：', error);
      return Promise.resolve({ success: false,data:error })
    }

  },
  //  USDT 兑换 TOTO
  async exchangeUsdtToTOTO({ state }, { amount, exchangeAddr, gasLimit = 1000000 }) {
    let addressValidate = isValidAddress(exchangeAddr);
    if (!addressValidate) return;
    let provider = await getProvider()
    const signer = provider.getSigner(); // 签名
    // 智能合约地址和ABI
    const exchangeContractAddress = state.ozcoinAddr;
    const exchangeContractABI = ozcoinExpandAbi;
    // 创建合约实例
    const exchangeContract = new ethers.Contract(exchangeContractAddress, exchangeContractABI, signer);
    // 调用兑换函数
    try {
      const tx = await exchangeContract.exchange(exchangeAddr, exchangeContractAddress, Erc20Transaction(amount.toString()), {
        gasLimit: ethers.utils.hexlify(gasLimit) // 设置为1000000，你需要根据实际情况调整这个值
      });
      await tx.wait(); // 等待交易确认
      return Promise.resolve({ success: true })
    } catch (error) {
      return Promise.resolve({ success: false })
    }
  },
  //   TOTO  兑换 USDT
  async exchangeTOTOToUsdt({ state }, { amount, exchangeAddr, gasLimit = 1000000 }) {
    let addressValidate = isValidAddress(exchangeAddr);
    if (!addressValidate) return;
    let provider = await getProvider()
    const signer = provider.getSigner(); // 签名
    // 智能合约地址和ABI
    const exchangeContractAddress = state.ozcoinAddr;
    const exchangeContractABI = ozcoinExpandAbi;
    // 创建合约实例
    const exchangeContract = new ethers.Contract(exchangeContractAddress, exchangeContractABI, signer);
    // 调用兑换函数
    try {
      const tx = await exchangeContract.reverseExchange(exchangeAddr, exchangeContractAddress, Erc20Transaction(amount.toString()), {
        gasLimit: ethers.utils.hexlify(gasLimit) // 设置为1000000，你需要根据实际情况调整这个值
      });
      await tx.wait(); // 等待交易确认
      return Promise.resolve({ success: true })
    } catch (error) {
      return Promise.resolve({ success: false })
    }
  },
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
};

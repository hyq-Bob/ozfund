/*
 * @Author: hyq_bob bob.he@autech.one
 * @Date: 2024-03-25 18:53:19
 * @LastEditors: hyq_bob bob.he@autech.one
 * @LastEditTime: 2024-04-08 17:22:31
 * @FilePath: /ozfund-mobile/src/store/modules/metamask.js
 * @Description: 钱包相关操作
 */
import { ethers } from "ethers";
// import Web3 from "web3";
import ozcoinExpandAbi from "@/abi/ozcoinExpandAbi.json";
import erc20Abi from "@/abi/erc20Abi.json";
import ozcoinStakeExpandAbi from "@/abi/ozcoinStakeExpandAbi.json";
import totoExpandAbi from "@/abi/totoExpandAbi.json";
import {
  getProvider,
  isValidAddress,
  Erc20Transaction,
  EthTransactionWei,
  signatureByEIP712,
  getChainId,
  getChainNonce,
  BigNumberToNum,
} from "@/utils/metamask.js";
import dayjs from "dayjs";
const state = {
  usdtAddr: process.env.VUE_APP_USDT_ADDR,
  ozcoinAddr: process.env.VUE_APP_OZCOIN_ADDR,
  totoAddr: process.env.VUE_APP_TOTO_ADDR,
  stakeAddr: process.env.VUE_APP_STAKE_ADDR,
  gasLimit: +process.env.VUE_APP_GAS_LIMIT,
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
        let provider = await getProvider();
        accounts = await provider.listAccounts();
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
  async exchangeTOTOforOzcoin({ state }, { amount, exchangeAddr, gasLimit }) {
    gasLimit = gasLimit || state.gasLimit;
    let addressValidate = isValidAddress(exchangeAddr);
    if (!addressValidate) return;
    let provider = await getProvider();
    const signer = provider.getSigner(); // 签名
    // 智能合约地址和ABI
    const exchangeContractAddress = state.ozcoinAddr;
    const exchangeContractABI = ozcoinExpandAbi;
    // 创建合约实例
    const exchangeContract = new ethers.Contract(
      exchangeContractAddress,
      exchangeContractABI,
      signer
    );
    // 调用兑换函数
    try {
      const tx = await exchangeContract.exchange(
        exchangeAddr,
        exchangeContractAddress,
        Erc20Transaction(amount.toString()),
        {
          gasLimit: ethers.utils.hexlify(gasLimit),
        }
      );
      await tx.wait(); // 等待交易确认
      return Promise.resolve({ success: true, data: tx });
    } catch (error) {
      return Promise.resolve({ success: false, data: error });
    }
    // console.log(`交易成功！交易哈希：${tx.hash}`);
  },
  //  USDT 兑换 OZC
  async exchangeUsdtForOzc({ state }, { amount, exchangeAddr, gasLimit }) {
    gasLimit = gasLimit || state.gasLimit;
    let addressValidate = isValidAddress(exchangeAddr);
    if (!addressValidate) return;
    let provider = await getProvider();
    const signer = provider.getSigner(); // 签名
    // 智能合约地址和ABI
    const exchangeContractAddress = state.ozcoinAddr;
    const exchangeContractABI = ozcoinExpandAbi;
    // 创建合约实例
    const exchangeContract = new ethers.Contract(
      exchangeContractAddress,
      exchangeContractABI,
      signer
    );
    // 调用兑换函数
    try {
      const tx = await exchangeContract.exchange(
        exchangeAddr,
        exchangeContractAddress,
        Erc20Transaction(amount.toString()),
        {
          gasLimit: ethers.utils.hexlify(gasLimit),
        }
      );
      await tx.wait(); // 等待交易确认
      return Promise.resolve({ success: true, data: tx });
    } catch (error) {
      return Promise.resolve({ success: false, data: error });
    }
  },
  //  OZC 兑换 USDT
  async exchangeOzcForUsdt({ state }, { amount, exchangeAddr, gasLimit }) {
    gasLimit = gasLimit || state.gasLimit;
    let addressValidate = isValidAddress(exchangeAddr);
    if (!addressValidate) return;
    let provider = await getProvider();
    const signer = provider.getSigner(); // 签名
    // 智能合约地址和ABI
    const exchangeContractAddress = state.usdtAddr;
    const exchangeContractABI = erc20Abi;
    // 创建合约实例
    const exchangeContract = new ethers.Contract(
      exchangeContractAddress,
      exchangeContractABI,
      signer
    );
    // 调用兑换函数
    try {
      const tx = await exchangeContract.exchange(
        exchangeAddr,
        exchangeContractAddress,
        Erc20Transaction(amount.toString()),
        {
          gasLimit: ethers.utils.hexlify(gasLimit),
        }
      );
      await tx.wait();
      return Promise.resolve({ success: true, data: tx });
    } catch (error) {
      return Promise.resolve({ success: false, data: error });
    } // 等待交易确认
  },
  // 质押
  async stakeCoin2({ state }, { amount, stakeAddr, gasLimit }) {
    gasLimit = gasLimit || state.gasLimit;
    const provider = await getProvider();
    const signer = provider.getSigner();
    if (!stakeAddr) {
      stakeAddr = await signer.getAddress();
    }
    const val = EthTransactionWei(amount);
    let deadline = dayjs()
      .add(1, "day")
      .unix(); // 获取当前时间+1天
    let nonce = await getChainNonce({
      ChainAddr: state.ozcoinAddr,
      ChainAbi: erc20Abi,
      schedulerAddr: stakeAddr,
      signer,
    });
    // 智能合约地址和ABI
    const stakingContractAddress = state.stakeAddr; // 链地址
    const stakingContractABI = ozcoinStakeExpandAbi;
    let chainId = await getChainId();
    let signature = await signatureByEIP712(
      "Ozcoin",
      state.ozcoinAddr, // ozc链地址
      stakeAddr, // 调用者地址
      stakingContractAddress, //质押链
      val, // 质押数据
      deadline,
      chainId,
      nonce
    );
    let r = signature.slice(0, 66);
    let s = "0x" + signature.slice(66, 130);
    let v = "0x" + signature.slice(130, 132);
    // 创建合约实例
    const stakingContract = new ethers.Contract(
      stakingContractAddress,
      stakingContractABI,
      signer
    );
    try {
      const tx = await stakingContract.stake(val, nonce, deadline, v, r, s, {
        gasLimit: ethers.utils.hexlify(gasLimit),
      });
      await tx.wait();
      console.log("质押成功！");
      return Promise.resolve({ success: true, data: tx });
    } catch (error) {
      console.error("质押失败：", error);
      return Promise.resolve({ success: false, data: error });
    }
  },
  //  USDT 兑换 TOTO
  async exchangeUsdtToTOTO({ state }, { amount, exchangeAddr, gasLimit }) {
    gasLimit = gasLimit || state.gasLimit;
    let addressValidate = isValidAddress(exchangeAddr);
    if (!addressValidate) return;
    let provider = await getProvider();
    const signer = provider.getSigner(); // 签名
    // 智能合约地址和ABI
    const exchangeContractAddress = state.ozcoinAddr;
    const exchangeContractABI = ozcoinExpandAbi;
    // 创建合约实例
    const exchangeContract = new ethers.Contract(
      exchangeContractAddress,
      exchangeContractABI,
      signer
    );
    // 调用兑换函数
    try {
      const tx = await exchangeContract.exchange(
        exchangeAddr,
        exchangeContractAddress,
        Erc20Transaction(amount.toString()),
        {
          gasLimit: ethers.utils.hexlify(gasLimit),
        }
      );
      await tx.wait(); // 等待交易确认
      return Promise.resolve({ success: true, data: tx });
    } catch (error) {
      return Promise.resolve({ success: false, data: error });
    }
  },
  //   TOTO  兑换 USDT
  async exchangeTOTOToUsdt({ state }, { amount, exchangeAddr, gasLimit }) {
    gasLimit = gasLimit || state.gasLimit;
    let addressValidate = isValidAddress(exchangeAddr);
    if (!addressValidate) return;
    let provider = await getProvider();
    const signer = provider.getSigner(); // 签名
    // 智能合约地址和ABI
    const exchangeContractAddress = state.ozcoinAddr;
    const exchangeContractABI = ozcoinExpandAbi;
    // 创建合约实例
    const exchangeContract = new ethers.Contract(
      exchangeContractAddress,
      exchangeContractABI,
      signer
    );
    // 调用兑换函数
    try {
      const tx = await exchangeContract.reverseExchange(
        exchangeAddr,
        exchangeContractAddress,
        Erc20Transaction(amount.toString()),
        {
          gasLimit: ethers.utils.hexlify(gasLimit),
        }
      );
      await tx.wait(); // 等待交易确认
      return Promise.resolve({ success: true, data: tx });
    } catch (error) {
      return Promise.resolve({ success: false, data: error });
    }
  },
  // 获取usdt余额
  async getUsdtBalance({ state }, { address }) {
    let provider = await getProvider();
    const signer = provider.getSigner(); // 签名
    const contract = new ethers.Contract(state.usdtAddr, erc20Abi, signer);
    let balance = await contract.balanceOf(address);
    return BigNumberToNum(balance, 6);
  },
  // 获取结算次数
  async getSettleCount({ state }) {
    let provider = await getProvider();
    const signer = provider.getSigner(); // 签名
    const contract = new ethers.Contract(
      state.stakeAddr,
      ozcoinStakeExpandAbi,
      signer
    );
    try {
      let num = await contract.settleCount();
      return Promise.resolve({success:true, data: num})
    } catch (error) {
      return Promise.resolve({success:false, data: error})
    }
   
  },
  // 获取下一笔的生成数量
  async getNextProductionNum({state}) {
    let provider = await getProvider();
    const signer = provider.getSigner(); // 签名
    const contract = new ethers.Contract(state.totoAddr, totoExpandAbi, signer);
    try {
      let result = await contract.nextProduction();
      return Promise.resolve({success:true, data:result})
    } catch (error) {
      return Promise.resolve({success:false, data:error})
    }
  },
  // 计算质押金额
  async getCountStakeAmount({state},settleCount) {
    let provider = await getProvider();
    const signer = provider.getSigner(); // 签名
    const contract = new ethers.Contract(
      state.stakeAddr,
      ozcoinStakeExpandAbi,
      signer
    );
    try {
      let num = await contract.countStakeAmount(settleCount);
      return Promise.resolve({success:true, data:num})
    } catch (error) {
      return Promise.resolve({success:false, data:error})
    }
    
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
};

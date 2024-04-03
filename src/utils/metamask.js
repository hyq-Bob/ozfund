/*
 * @Author: hyq_bob bob.he@autech.one
 * @Date: 2024-03-25 19:06:54
 * @LastEditors: hyq_bob bob.he@autech.one
 * @LastEditTime: 2024-04-03 11:59:00
 * @FilePath: /ozfund-mobile/src/utils/metamask.js
 * @Description: metamask相关
 */
import { ethers } from "ethers";
const ethereum = window.ethereum;

// 请求用户授权
async function requestMetaMaskAccess() {
  return await ethereum.request({ method: "eth_requestAccounts" });
}
// 连接到MetaMask
async function getProvider() {
  await requestMetaMaskAccess();
  return new ethers.providers.Web3Provider(ethereum);
}
// 连接MetaMask
function connectMetaMask() {
  if (typeof ethereum !== "undefined") {
    return getProvider();
  } else {
    console.log("MetaMask is not installed!");
  }
}
// 使用 ethers.js 验证地址
function isValidAddress(address) {
  return ethers.utils.isAddress(address);
}
async function resolveENSName(ensName) {
  const provider = new ethers.providers.JsonRpcProvider();
  const address = await provider.resolveName(ensName);
  if (address === null) {
    console.log("ENS name is not registered or invalid");
  } else {
    console.log("Resolved address:", address);
    return address;
  }
}
// 监听网络变化
async function addEventListenerChainChanged(fn) {
  if (typeof ethereum !== "undefined") {
    ethereum.on("chainChanged", (chainId) => {
      const provider = new ethers.providers.Web3Provider(ethereum);
      fn?.(provider, chainId);
    });
  }
}
// 监听账户变化事件
async function addEventListenerAccountsChanged(fn) {
  if (typeof ethereum !== "undefined") {
    ethereum.on("accountsChanged", (accounts) => {
      // 检查账户数组是否为空，空数组意味着用户断开了连接
      if (accounts.length === 0) {
        fn?.({ isConnectMetaMask: false, accounts: "" });
      } else {
        fn?.({ isConnectMetaMask: true, accounts: accounts[0] });
      }
    });
  }
}
// ETH 转换为 Wei
function EthTransactionWei(amount) {
  return ethers.utils.parseEther(amount).toString();
}
// ERC-20 代币转换为最小单位
function Erc20Transaction(amount, decimals = 18) {
  return ethers.utils.parseUnits(amount, decimals).toString();
}
/**
 * @summary 使用EIP712签名
 * @param {*} tokenName 应用名称
 * @param {*} verifyAddr  ozc链地址
 * @param {*} owner  调用者地址
 * @param {*} spender  质押链
 * @param {*} val  质押数据
 * @param {*} deadline 随机数
 * @param {*} chainId 链ID
 * @param {*} nonce 链nonce
 * @returns 签名字符串
 */
async function signatureByEIP712(tokenName,verifyAddr,owner,spender,val,deadline,chainId,nonce) {
  let types = {
    EIP712Domain: [
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "chainId", type: "uint256" },
      { name: "verifyingContract", type: "address" },
    ],
    Permit: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
      { name: "value", type: "uint256" },
      { name: "nonce", type: "uint256" },
      { name: "deadline", type: "uint256" },
    ],
  };

  let domain = {
    name: tokenName,
    version: "1",
    chainId: chainId,
    verifyingContract: verifyAddr,
  };
  let message = {
    owner: owner,
    spender: spender,
    value: val,
    nonce: nonce,
    deadline: deadline,
  };
  const primaryType = 'Permit'; // 指定主类型
  // 使用ethers.js生成签名
  let paramsStr = JSON.stringify({
    types,
    primaryType,
    domain,
    message
  })
  
  console.log('签名对应的参数》》》》: ', paramsStr);
  let signature = await ethereum.request({
    method: 'eth_signTypedData_v4',
    params: [owner, paramsStr],
    from:owner
  });
  return signature;
}
// 获取链ID
function getChainId() {
  return ethereum.request({ method: "eth_chainId" });
}
// 获取对应链的Nonce
async function getChainNonce({ChainAddr, ChainAbi, schedulerAddr, signer}){
  const contract = new ethers.Contract(ChainAddr, ChainAbi, signer)
  const nonce1 = await contract.nonces(schedulerAddr)
  const hexString = ethers.utils.hexlify(nonce1);
  // 将十六进制字符串转换为BigNumber对象
  const bigNumber = ethers.BigNumber.from(hexString);
  // 将BigNumber对象转换为JavaScript原生的数字类型（uint256）
  const nonce = bigNumber.toNumber();
  return nonce
}
// 十六进制转十进制
function BigNumberToNum(hexValue, unit = "ether") {
  const bigNumber = ethers.BigNumber.from(hexValue).toString();
  return ethers.utils.formatUnits(bigNumber, unit) * 1;
}
export {
  getChainNonce,
  BigNumberToNum,
  connectMetaMask,
  getProvider,
  requestMetaMaskAccess,
  resolveENSName,
  isValidAddress,
  addEventListenerChainChanged,
  addEventListenerAccountsChanged,
  EthTransactionWei,
  Erc20Transaction,
  signatureByEIP712,
  getChainId,
};

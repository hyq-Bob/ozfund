import { providers, ethers } from "ethers";
import { provider } from "@/walletConnect/provide";
import Web3 from "web3";
import erc20ContractAbi from "@/abi/erc20Abi.json";
import ozcoinExpandAbi from "@/abi/ozcoinExpandAbi.json";
import totoExpandAbi from "@/abi/totoExpandAbi.json";
import ozcoinStakeExpandAbi from "@/abi/ozcoinStakeExpandAbi.json";
import * as operCookie from '@/utils/auth'
import { message } from 'ant-design-vue';
import { multiply } from '@/utils/filters'
import {
  getProvider
} from "@/utils/metamask.js";
const state = {
  loading: false,
  clientType: 'pc',
  web3: new Web3(provider),
  web3Provider: new providers.Web3Provider(provider),
  signer: null,
  address: operCookie.getToken('WALLET_ADDRESS'),
  chainId: "",
  // status: false,
  // 

  // 测试
  // busdContractAddress: "0xd92e713d051c37ebb2561803a3b5fbabc4962431",
  // ozcoinContractAddress: "0x10F9C7fd4B692B299B7A2B241dd29897218Aebe7",
  // totoContractAddress:  "0x2e02a7873C93919F16aa94e915Db1Cfbd1c26513",
  // ozcoinContractAddress: "0xc1b93a0076Cee05dFe01caA08Ca726Bc2D881b95",
  // totoContractAddress: "0x88468dbDd08bf76b45C512d5d30048d70B3F2b00",

  // 2023-1-13日修改
  busdContractAddress: process.env.VUE_APP_BUSD_ADDR,
  ozcoinContractAddress: process.env.VUE_APP_OZCOIN_ADDR,
  totoContractAddress: process.env.VUE_APP_TOTO_ADDR,
  totoBalance: null,
  ozcoinStakeContractAddress:process.env.VUE_APP_STAKE_ADDR,
  ozcBalance: null,
  busdBalance: null,
  stakeRate: 10,
  totoStakeAmount: null,
  ozcStakeAmount: null,
  totoSupply: null,
  ozcSupply: null,
}
const getters = {
  loading: state => state.loading,
  clientType: state => state.clientType,
  address: state => state.address || operCookie.getToken('WALLET_ADDRESS'),
  chainId: state => state.chainId,
  status: state => state.status,
  totoBalance: state => state.totoBalance,
  ozcBalance: state => state.ozcBalance,
  busdBalance: state => state.busdBalance,
  stakeRate: state => state.stakeRate,
  totoStakeAmount: state => state.totoStakeAmount,
  ozcStakeAmount: state => state.ozcStakeAmount,
  totoContractAddress: state => state.totoContractAddress,
  ozcoinContractAddress: state => state.ozcoinContractAddress,
  totoSupply: state => state.totoSupply,
  ozcSupply: state => state.ozcSupply,
}
const mutations = {
  SAVE_WALLET_INFO(state, data) {
    state[data.key] = data.value;
  }
}
const actions = {
  // 移动端 开始连接
  async connectWalletConnect({ dispatch }) {
    // 触发二维码
    await provider.enable()
    dispatch('getMoreData')
  },
  async getMoreData({ commit, dispatch }) {
    const localStorageWalletConnect = JSON.parse(localStorage.getItem('walletconnect'))
    if (localStorageWalletConnect && localStorageWalletConnect.address) {
      operCookie.setToken('WALLET_ADDRESS', localStorageWalletConnect.address)
    }
    const web3Provider = new providers.Web3Provider(provider);
    commit("SAVE_WALLET_INFO", { key: "web3Provider", value: web3Provider });
    const web3 = new Web3(provider)
    commit("SAVE_WALLET_INFO", { key: "web3", value: web3 });
    const signer = web3Provider.getSigner();
    commit("SAVE_WALLET_INFO", { key: "signer", value: signer });
    // const address = signer.getAddress();
    commit("SAVE_WALLET_INFO", { key: "status", value: true });
    initPro(provider, commit);
    dispatch("getMobileBalance", { key: "totoBalance", unit: "ether" });
    dispatch("getMobileBalance", { key: "ozcBalance", unit: "ether" });
    dispatch("getMobileBalance", { key: "busdBalance", unit: process.env.NODE_ENV === 'development' ? 'mwei' : "ether" });
    // dispatch("getMobileBalance", { key: "busdBalance", unit: "ether" });
    // dispatch("getPcBalance");

    // 获取toto和ozc保有量
    dispatch('getTotalSupply')
    // pc and mobile 获取toto质押ozc时的收益率的次数（预计获取多少）和 获取质押的余额
    dispatch('totoStakeOzcEarnings')
  },
  // 获取余额
  getMobileBalance({ commit, state }, { key, unit }) {
    let myContract = null;
    switch (key) {
      case "totoBalance":
        myContract = new state.web3.eth.Contract(
          erc20ContractAbi,
          state.totoContractAddress,
          { from: state.address }
        );
        break;
      case "ozcBalance":
        myContract = new state.web3.eth.Contract(
          erc20ContractAbi,
          state.ozcoinContractAddress,
          { from: state.address }
        );
        break;
      case "busdBalance":
        myContract = new state.web3.eth.Contract(
          erc20ContractAbi,
          state.busdContractAddress,
          { from: state.address || operCookie.getToken('WALLET_ADDRESS')}
        );
        break;
    }
    myContract.methods
      .balanceOf(state.address || operCookie.getToken('WALLET_ADDRESS'))
      .call({ from: state.address }, (error, result) => {
        if (!error) {
          let ubalance = state.web3.utils.fromWei(String(result), unit);
          commit("SAVE_WALLET_INFO", { key, value: ubalance });
        } else {
          console.warn(error, '获取余额报错');
        }
      });
  },
  // 断开
  disconnectWallet({ commit }) {
    provider.disconnect()
    commit("SAVE_WALLET_INFO", { key: "address", value: null });
    commit("SAVE_WALLET_INFO", { key: "status", value: false });
    commit("SAVE_WALLET_INFO", { key: "chainId", value: null });
    operCookie.removeToken('WALLET_ADDRESS')
    localStorage.removeItem('walletconnect')
    location.reload()
  },
  // 授权
  async mobileApproveErc20({ state, commit }, data) {
    let contractAddress = null,
      spender = null;
    switch (data.type) {
      case "b-o":
        contractAddress = state.busdContractAddress;
        spender = state.ozcoinContractAddress;
        break;
      case "o-b":
        contractAddress = state.ozcoinContractAddress;
        spender = state.busdContractAddress;
        break;
    }
    // let maxFeePerGas = state.web3.utils.toWei("1.5", "gwei");
    // let maxPriorityFeePerGas = state.web3.utils.toWei("1.5", "gwei");
    let nonce = await state.web3.eth.getTransactionCount(
      state.address,
      "pending"
    );
    let amountUint = state.web3.utils.toWei(String(data.amount), data.unit);
    let myContract = new state.web3.eth.Contract(
      erc20ContractAbi,
      contractAddress,
      {
        from: state.address, // default from address
        gasLimit: 70000,
        gasPrice: 10000000000 // default gas price in wei, 10 gwei in this case
      }
    );
    var rawTransaction = {
      from: state.address,
      nonce: state.web3.utils.toHex(nonce),
      // "maxFeePerGas": state.web3.utils.toHex(maxFeePerGas),
      // "maxPriorityFeePerGas":  state.web3.utils.toHex(maxPriorityFeePerGas),
      to: contractAddress,
      value: "0x0",
      data: myContract.methods.approve(spender, amountUint).encodeABI(),
      chainId: state.chainId
    };
    // const txHash = await ethereum.request({
    //     method: 'eth_sendTransaction',
    //     params: [rawTransaction],
    // });
    commit("SAVE_WALLET_INFO", { key: "loading", value: true })
    let result = null
    try {
      result = await provider.request({
        method: 'eth_sendTransaction',
        params: [rawTransaction]
      });
    } catch (error) { console.log('BUSD兑换OZC授权报错：' + error) }
    commit("SAVE_WALLET_INFO", { key: "loading", value: false })
    if (result) {
      if (data.cb) data.cb()
      // dispatch('mobileExchangeOZCoin', { ...data })
    }
  },
  // 转换OZC
  async mobileExchangeOZCoin({ state, commit }, { amount, unit, cb }) {
    // let maxFeePerGas = state.web3.utils.toWei("2", "gwei");
    // let maxPriorityFeePerGas = state.web3.utils.toWei("1.5", "gwei");
    let gasLimit = state.web3.utils.toWei("200000", "wei");
    let nonce = await state.web3.eth.getTransactionCount(
      state.address,
      "pending"
    );
    let amountUint = state.web3.utils.toWei(String(amount), unit);
    let myContract = new state.web3.eth.Contract(
      ozcoinExpandAbi,
      state.ozcoinContractAddress,
      {
        from: state.address // default from address
        //gasLimit: 70000,
        //gasPrice: 1000000000 // default gas price in wei, 10 gwei in this case
      }
    );
    var rawTransaction = {
      from: state.address,
      nonce: state.web3.utils.toHex(nonce + 1),
      // maxFeePerGas: state.web3.utils.toHex(maxFeePerGas),
      // maxPriorityFeePerGas: state.web3.utils.toHex(maxPriorityFeePerGas),
      gas: state.web3.utils.toHex(gasLimit),
      to: state.ozcoinContractAddress,
      value: "0x0",
      data: myContract.methods
        .exchange(state.address, state.busdContractAddress, amountUint)
        .encodeABI(),
      chainId: state.chainId
    };
    commit("SAVE_WALLET_INFO", { key: "loading", value: true })
    let result = null
    try {
      result = await provider.request({
        method: 'eth_sendTransaction',
        params: [rawTransaction]
      });
    } catch (error) { console.log('BUSD兑换OZC报错：' + error) }
    commit("SAVE_WALLET_INFO", { key: "loading", value: false })
    if (result) {
      if (cb) cb('success')
    } else {
      if (cb) cb('error')
    }
  },
  // ozc转回
  async mobileReverseExchangeOZCoin({ state, commit }, { amount, unit, cb }) {
    // let maxFeePerGas = state.web3.utils.toWei("1.5", "gwei");
    // let maxPriorityFeePerGas = state.web3.utils.toWei("1.5", "gwei");
    // let gasLimit = 8000000;
    let nonce = await state.web3.eth.getTransactionCount(
      state.address,
      "pending"
    );
    let amountUint = state.web3.utils.toWei(String(amount), unit);
    let myContract = new state.web3.eth.Contract(
      ozcoinExpandAbi,
      state.ozcoinContractAddress,
      {
        from: state.address, // default from address
        gasLimit: 70000,
        gasPrice: 1000000000 // default gas price in wei, 10 gwei in this case
      }
    );
    var rawTransaction = {
      from: state.address,
      nonce: state.web3.utils.toHex(nonce),
      // maxFeePerGas: maxFeePerGas,
      // maxPriorityFeePerGas: maxPriorityFeePerGas,
      to: state.ozcoinContractAddress,
      value: "0x0",
      data: myContract.methods
        .reverseExchange(state.address, state.busdContractAddress, amountUint)
        .encodeABI(),
      chainId: state.chainId
    };
    commit("SAVE_WALLET_INFO", { key: "loading", value: true })
    let result = null
    try {
      result = await provider.request({
        method: 'eth_sendTransaction',
        params: [rawTransaction]
      });
    } catch (error) { console.log('OZC兑换BUSD报错：' + error) }
    commit("SAVE_WALLET_INFO", { key: "loading", value: false })
    if (result) {
      if (cb) cb('success')
    } else {
      if (cb) cb('error')
    }
  },
  // mobile质押
  async mobileStake({ state, commit }, { amount, unit, cb }) {
    let spender = state.ozcoinStakeContractAddress;
    var timestamp = new Date().getTime();
    let deadline = timestamp + 360000;
    let value = state.web3.utils.toWei(amount, unit);
    let nonce = await state.web3.eth.getTransactionCount(
      state.address,
      "pending"
    );
    let permitData = signPremit(
      "OZCoin",
      state.ozcoinContractAddress,
      state.address,
      spender,
      value,
      deadline,
      state.chainId,
      nonce
    );
    commit("SAVE_WALLET_INFO", { key: "loading", value: true })
    let signatureR = null
    try {
      console.log('state>>>>: ', state);
      signatureR = await state.web3Provider.send("eth_signTypedData_v4", [
        state.address,
        permitData
      ]);
    } catch (error) { console.log('质押第一步报错：' + error) }
    
    console.log('signatureR: ', signatureR);
    // let signatureR = await state.web3Provider.send({
    //     method: 'eth_signTypedData_v4',
    //     params: [ state.address, permitData ],
    // });
    commit("SAVE_WALLET_INFO", { key: "loading", value: false })
    let myContract = new state.web3.eth.Contract(
      ozcoinStakeExpandAbi,
      state.ozcoinStakeContractAddress,
      {
        from: state.address, // default from address
        gasLimit: 70000,
        gasPrice: 1000000000 // default gas price in wei, 10 gwei in this case
      }
    );
    let r = signatureR.slice(0, 66);
    let s = "0x" + signatureR.slice(66, 130);
    let v = "0x" + signatureR.slice(130, 132);
    // let permit = [state.address, spender, value, nonce, deadline];
    // 2023-1-14 更改
    const myContract2 = new state.web3.eth.Contract(
      erc20ContractAbi,
      state.ozcoinContractAddress,
      { from: state.address }
    );
    myContract2.methods.nonces(state.address).call({ from: state.address }, async function (error, results) {
      if (error) return console.log(error)
      let nonce2 = state.web3.utils.fromWei(String(results), unit);
      var rawTransaction = {
        from: state.address,
        nonce: nonce2,
        to: state.ozcoinStakeContractAddress,
        // to: state.address,
        value: "0x0",
        data: myContract.methods
          .stake(value, nonce, deadline, v, r, s)
          .encodeABI(),
        chainId: state.chainId
      };
      commit("SAVE_WALLET_INFO", { key: "loading", value: true })
      let result = null
      try {
        result = await provider.request({
          method: 'eth_sendTransaction',
          params: [rawTransaction]
        });
      } catch (error) {
        console.log('质押失败报错：' + error)
      }
      commit("SAVE_WALLET_INFO", { key: "loading", value: false })
      if (result) {
        if (cb) cb('success')
      } else {
        if (cb) cb('error')
      }
    })

  },
  // mobile提取
  async mobileRedemption({ state, commit }, { cb }) {
    let nonce = await state.web3.eth.getTransactionCount(
      state.address,
      "pending"
    );
    let myContract = new state.web3.eth.Contract(
      ozcoinStakeExpandAbi,
      state.ozcoinStakeContractAddress,
      {
        from: state.address, // default from address
        gasLimit: 70000,
        gasPrice: 1000000000 // default gas price in wei, 10 gwei in this case
      }
    );
    var rawTransaction = {
      from: state.address,
      nonce: state.web3.utils.toHex(nonce),
      to: state.ozcoinStakeContractAddress,
      value: "0x0",
      data: myContract.methods.redemption().encodeABI(),
      chainId: state.chainId
    };
    commit("SAVE_WALLET_INFO", { key: "loading", value: true })
    let result = null
    try {
      result = await provider.request({
        method: 'eth_sendTransaction',
        params: [rawTransaction]
      });
    } catch (error) { console.log('提取报错：' + error) }
    commit("SAVE_WALLET_INFO", { key: "loading", value: false })
    if (result) {
      if (cb) cb('success')
    } else {
      if (cb) cb('error')
    }
  },
  // mobile 授权 busd转toto
  async mobileApproveToto({ state, commit }, data) {
    let contractAddress = state.busdContractAddress, spender = state.totoContractAddress;
    // let maxFeePerGas = state.web3.utils.toWei("1.5", "gwei");
    // let maxPriorityFeePerGas = state.web3.utils.toWei("1.5", "gwei");
    let nonce = await state.web3.eth.getTransactionCount(
      state.address,
      "pending"
    );
    let amountUint = state.web3.utils.toWei(String(data.amount), data.unit);
    console.log(amountUint, "amountUint");
    let myContract = new state.web3.eth.Contract(
      erc20ContractAbi,
      contractAddress,
      {
        from: state.address, // default from address
        gasLimit: 70000,
        gasPrice: 1000000000 // default gas price in wei, 10 gwei in this case
      }
    );
    var rawTransaction = {
      from: state.address,
      nonce: state.web3.utils.toHex(nonce),
      //"maxFeePerGas": state.web3.utils.toHex(maxFeePerGas),
      //"maxPriorityFeePerGas":  state.web3.utils.toHex(maxPriorityFeePerGas),
      to: contractAddress,
      value: "0x0",
      data: myContract.methods.approve(spender, amountUint).encodeABI(),
      chainId: state.chainId
    };
    commit("SAVE_WALLET_INFO", { key: "loading", value: true })
    let result = null
    try {
      result = await provider.request({
        method: 'eth_sendTransaction',
        params: [rawTransaction]
      });
    } catch (error) { console.log('BUSD转TOTO授权报错：' + error) }
    commit("SAVE_WALLET_INFO", { key: "loading", value: false })
    if (result) {
      if (data.cb) data.cb()
    }
  },
  // mobile 转换TOTO
  async mobileExchangeToto({ state, commit }, { amount, unit, cb }) {
    let gasLimit = state.web3.utils.toWei("200000", "wei");
    let nonce = await state.web3.eth.getTransactionCount(
      state.address,
      "pending"
    );
    let amountUint = state.web3.utils.toWei(String(amount), unit);
    let myContract = new state.web3.eth.Contract(
      totoExpandAbi,
      state.totoContractAddress,
      {
        from: state.address // default from address
        //gasLimit: 70000,
        //gasPrice: 1000000000 // default gas price in wei, 10 gwei in this case
      }
    );
    var rawTransaction = {
      from: state.address,
      nonce: state.web3.utils.toHex(nonce + 1),
      // maxFeePerGas: state.web3.utils.toHex(maxFeePerGas),
      // maxPriorityFeePerGas: state.web3.utils.toHex(maxPriorityFeePerGas),
      gas: state.web3.utils.toHex(gasLimit),
      to: state.totoContractAddress,
      value: "0x0",
      data: myContract.methods
        .exchange(state.address, state.busdContractAddress, amountUint)
        .encodeABI(),
      chainId: state.chainId
    };
    commit("SAVE_WALLET_INFO", { key: "loading", value: true })
    let result = null
    try {
      result = await provider.request({
        method: 'eth_sendTransaction',
        params: [rawTransaction]
      });
    } catch (error) { console.log('BUSD转TOTO报错：' + error) }
    commit("SAVE_WALLET_INFO", { key: "loading", value: false })
    if (result) {
      if (cb) cb('success')
    } else {
      if (cb) cb('error')
    }
  },
  // ----------------------------------------------------------------------------------------------------
  // pc 端开始连接
  async pcConnectWallet({ commit, dispatch }) {
    if (!navigator.userAgent.includes('Chrome')) return message.error('请使用Google浏览器')
    if (!window.ethereum && !window.location.pathname.includes('pdf')) {
      message.error('请安装钱包')
      window.open('https://metamask.io/download/')
      return
    }
    commit("SAVE_WALLET_INFO", { key: "web3", value: window.ethereum ? new Web3(window.ethereum) : null });
    let addr = await window.ethereum.request({ method: 'eth_requestAccounts' })
    let address = addr[0]
    if (address) {
      operCookie.setToken('pcToken', address)
      commit("SAVE_WALLET_INFO", { key: "address", value: address });
      if (address) operCookie.setToken('WALLET_ADDRESS', address)
      commit("SAVE_WALLET_INFO", { key: "status", value: true });
      dispatch("getPcBalance");
      let chainId = await window.ethereum.request({ method: 'eth_chainId' });
      commit("SAVE_WALLET_INFO", { key: "chainId", value: chainId });
      // 获取toto和ozc保有量
      dispatch('getTotalSupply')
      // pc and mobile 获取toto质押ozc时的收益率的次数（预计获取多少）和 获取质押的余额
      dispatch('totoStakeOzcEarnings')
    } else {
      message.error('连接失败，请重试')
      operCookie.removeToken('pcToken')
      commit("SAVE_WALLET_INFO", { key: "address", value: null });
      operCookie.removeToken('WALLET_ADDRESS')
      commit("SAVE_WALLET_INFO", { key: "status", value: false });
    }
  },
  // pc 断开链接
  async pcDisconnectWallet({ commit }) {
    commit("SAVE_WALLET_INFO", { key: "address", value: null });
    operCookie.removeToken('WALLET_ADDRESS')
    commit("SAVE_WALLET_INFO", { key: "chainId", value: null });
    commit("SAVE_WALLET_INFO", { key: "status", value: false });
    operCookie.removeToken('pcToken')
  },
  async getPcBalance({ state, dispatch }) {
    let balanceHex = await window.ethereum.request({ method: 'eth_getBalance', params: [state.address, "latest"] });
    let balance = Web3.utils.fromWei(String(Number(balanceHex)), 'ether');
    dispatch("getPcBalanceNext", { key: "totoBalance", unit: "ether" });
    dispatch("getPcBalanceNext", { key: "ozcBalance", unit: "ether" });
    dispatch("getPcBalanceNext", { key: "busdBalance", unit: "mwei" });
    // dispatch("getPcBalanceNext", { key: "busdBalance", unit: process.env.NODE_ENV === 'development' ? 'mwei' : "ether" });
  },
  async getPcBalanceNext({ state, commit }, { key, unit }) {
    let myContract = null;
    switch (key) {
      case "totoBalance":
        myContract = new state.web3.eth.Contract(
          erc20ContractAbi,
          state.totoContractAddress,
          { from: state.address }
        );
        break;
      case "ozcBalance":
        myContract = new state.web3.eth.Contract(
          erc20ContractAbi,
          state.ozcoinContractAddress,
          { from: state.address }
        );
        break;
      case "busdBalance":
        myContract = new state.web3.eth.Contract(
          erc20ContractAbi,
          state.busdContractAddress,
          { from: state.address }
        );
        break;
    }
    myContract.methods
      .balanceOf(state.address)
      .call({ from: state.address }, function (error, result) {
        if (!error) {
          let ubalance = state.web3.utils.fromWei(String(result), unit);
          console.log(ubalance, 'ubalance')
          commit("SAVE_WALLET_INFO", { key, value: ubalance });
        } else {
          console.log(error, 'rooro');
        }
      });
  },

  // pc 授权
  async pcApproveErc20({ state, dispatch }, data) {
    let contractAddress = null,
      spender = null;
    switch (data.type) {
      case "b-o":
        contractAddress = state.busdContractAddress;
        spender = state.ozcoinContractAddress;
        break;
      case "o-b":
        contractAddress = state.ozcoinContractAddress;
        spender = state.busdContractAddress;
        break;
      case "u-t":
        contractAddress = state.busdContractAddress;
        spender = state.totoContractAddress;
        break;
    }
    let maxFeePerGas = state.web3.utils.toWei("1.5", "gwei");
    let maxPriorityFeePerGas = state.web3.utils.toWei("1.5", "gwei");
    console.log(maxFeePerGas, 1);
    console.log(maxPriorityFeePerGas, 2);
    let nonce = await state.web3.eth.getTransactionCount(
      state.address,
      "pending"
    );
    let amountUint = state.web3.utils.toWei(String(data.amount), data.unit);
    let myContract = new state.web3.eth.Contract(
      erc20ContractAbi,
      contractAddress,
      {
        from: state.address, // default from address
        gasLimit: 70000,
        gasPrice: 1000000000 // default gas price in wei, 10 gwei in this case
      }
    );
    var rawTransaction = {
      from: state.address,
      nonce: state.web3.utils.toHex(nonce),
      to: contractAddress,
      value: "0x0",
      data: myContract.methods.approve(spender, amountUint).encodeABI(),
      chainId: state.chainId
    };

    myContract.methods.approve(spender, amountUint).send({from: state.address}).then(async (res) => {
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [rawTransaction],
      });
      if (txHash) {
        if (data.type === 'b-o') return dispatch('pcExchangeOZCoin', { amount: data.amount, unit: data.unit, cb: data.cb })
        if (data.type === 'o-b') return dispatch('pcReverseExchangeOZCoin', { amount: data.amount, unit: data.unit, cb: data.cb })
      }

    })
    
    
  },
  // pc 转换OZC
  async pcExchangeOZCoin({ state }, { amount, unit, cb }) {
    let gasLimit = new Web3(provider).utils.toWei("200000", "wei");
    let nonce = await new Web3(provider).eth.getTransactionCount(
      state.address,
      "pending"
    );
    let amountUint = state.web3.utils.toWei(String(amount), unit);
    let myContract = new state.web3.eth.Contract(
      ozcoinExpandAbi,
      state.ozcoinContractAddress,
      {
        from: state.address // default from address
      }
    );
    var rawTransaction = {
      from: state.address,
      nonce: state.web3.utils.toHex(nonce),
      // maxFeePerGas: state.web3.utils.toHex(maxFeePerGas),
      // maxPriorityFeePerGas: state.web3.utils.toHex(maxPriorityFeePerGas),
      gas: state.web3.utils.toHex(gasLimit),
      to: state.ozcoinContractAddress,
      value: "0x0",
      data: myContract.methods
        .exchange(state.address, state.busdContractAddress, amountUint)
        .encodeABI(),
      chainId: state.chainId
    };
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [rawTransaction],
    });
    // console.log(txHash, '兑换返回的额结果2')
    if (txHash) {
      if (cb) cb('success')
    } else {
      if (cb) cb('error')
    }
  },
  // pc ozc转回
  async pcReverseExchangeOZCoin({ state }, { amount, unit, cb }) {
    // let maxFeePerGas = state.web3.utils.toWei("1.5", "gwei");
    // let maxPriorityFeePerGas = state.web3.utils.toWei("1.5", "gwei");
    // let gasLimit = 8000000;
    let nonce = await state.web3.eth.getTransactionCount(
      state.address,
      "pending"
    );
    let amountUint = state.web3.utils.toWei(String(amount), unit);
    let myContract = new state.web3.eth.Contract(
      ozcoinExpandAbi,
      state.ozcoinContractAddress,
      {
        from: state.address, // default from address
        gasLimit: 70000,
        gasPrice: 1000000000 // default gas price in wei, 10 gwei in this case
      }
    );
    var rawTransaction = {
      from: state.address,
      nonce: state.web3.utils.toHex(nonce),
      // maxFeePerGas: maxFeePerGas,
      // maxPriorityFeePerGas: maxPriorityFeePerGas,
      to: state.ozcoinContractAddress,
      value: "0x0",
      data: myContract.methods
        .reverseExchange(state.address, state.busdContractAddress, amountUint)
        .encodeABI(),
      chainId: state.chainId
    };
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [rawTransaction],
    });
    if (txHash) {
      if (cb) cb('success')
    } else {
      if (cb) cb('error')
    }
  },
  // pc 授权 busd转toto
  async pcApproveToto({ state, dispatch }, data) {
    let contractAddress = state.busdContractAddress, spender = state.totoContractAddress;
    let maxFeePerGas = state.web3.utils.toWei("1.5", "gwei");
    let maxPriorityFeePerGas = state.web3.utils.toWei("1.5", "gwei");
    console.log(maxFeePerGas, 1);
    console.log(maxPriorityFeePerGas, 2);
    let nonce = await state.web3.eth.getTransactionCount(
      state.address,
      "pending"
    );
    let amountUint = state.web3.utils.toWei(String(data.amount), data.unit);
    let myContract = new state.web3.eth.Contract(
      erc20ContractAbi,
      contractAddress,
      {
        from: state.address, // default from address
        gasLimit: 70000,
        gasPrice: 1000000000 // default gas price in wei, 10 gwei in this case
      }
    );
    var rawTransaction = {
      from: state.address,
      nonce: state.web3.utils.toHex(nonce),
      //"maxFeePerGas": state.web3.utils.toHex(maxFeePerGas),
      //"maxPriorityFeePerGas":  state.web3.utils.toHex(maxPriorityFeePerGas),
      to: contractAddress,
      value: "0x0",
      data: myContract.methods.approve(spender, amountUint).encodeABI(),
      chainId: state.chainId
    };
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [rawTransaction],
    });
    console.log(txHash, 'pc授权返回的结果')
    if (txHash) {
      dispatch('pcExchangeToto', { amount: data.amount, unit: data.unit, cb: data.cb })
    }
  },
  // pc 转换TOTO
  async pcExchangeToto({ state }, { amount, unit, cb }) {
    // let maxFeePerGas = state.web3.utils.toWei("2", "gwei");
    // let maxPriorityFeePerGas = state.web3.utils.toWei("1.5", "gwei");
    let gasLimit = state.web3.utils.toWei("200000", "wei");
    let nonce = await state.web3.eth.getTransactionCount(
      state.address,
      "pending"
    );
    let amountUint = state.web3.utils.toWei(String(amount), unit);
    let myContract = new state.web3.eth.Contract(
      totoExpandAbi,
      state.totoContractAddress,
      {
        from: state.address // default from address
        //gasLimit: 70000,
        //gasPrice: 1000000000 // default gas price in wei, 10 gwei in this case
      }
    );
    var rawTransaction = {
      from: state.address,
      nonce: state.web3.utils.toHex(nonce),
      // maxFeePerGas: state.web3.utils.toHex(maxFeePerGas),
      // maxPriorityFeePerGas: state.web3.utils.toHex(maxPriorityFeePerGas),
      gas: state.web3.utils.toHex(gasLimit),
      to: state.totoContractAddress,
      value: "0x0",
      data: myContract.methods
        .exchange(state.address, state.busdContractAddress, amountUint)
        .encodeABI(),
      chainId: state.chainId
    };
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [rawTransaction],
    });
    if (txHash) {
      if (cb) cb('success')
    } else {
      if (cb) cb('error')
    }
  },
  // pc 质押
  async pcStake({ state }, { amount, unit, cb }) {
    const provider = await getProvider()
    const signer = provider.getSigner();
    let spender = state.ozcoinStakeContractAddress;
    var timestamp = new Date().getTime();
    let deadline = timestamp + 360000;
    let value = state.web3.utils.toWei(amount, unit);
    let myContract1 = new ethers.Contract(
      state.ozcoinContractAddress,
      erc20ContractAbi,
      signer
    );

  let nonce1 =  await myContract1.nonces(state.address)
  //  const nonce = myContract1.nonces(state.ozcoinStakeContractAddress)

   const hexString = ethers.utils.hexlify(nonce1);
   
   // 将十六进制字符串转换为BigNumber对象
   const bigNumber = ethers.BigNumber.from(hexString);
   
   // 将BigNumber对象转换为JavaScript原生的数字类型（uint256）
  //  const nonce = bigNumber.toNumber();
    
    let nonce = await state.web3.eth.getTransactionCount(
      state.address,
      "pending"
      // 'latest'
      );
    console.log('nonce: ', nonce);
    nonce +=1
    let permitData = signPremit(
      "OZCoin",
      state.ozcoinContractAddress,
      state.address,
      spender,
      value,
      deadline,
      state.chainId,
      nonce
      );
      console.log('permitData: ', permitData);
    let signatureR = await window.ethereum.request({
      method: 'eth_signTypedData_v4',
      params: [state.address, permitData],
    });
    let myContract = new state.web3.eth.Contract(
      ozcoinStakeExpandAbi,
      state.ozcoinStakeContractAddress,
      {
        from: state.address, // default from address
        gasLimit: 1000000,
        gasPrice: 1000000000 // default gas price in wei, 10 gwei in this case
      }
    );
    let r = signatureR.slice(0, 66);
    let s = "0x" + signatureR.slice(66, 130);
    let v = "0x" + signatureR.slice(130, 132);
    // let permit = [state.address, spender, value, nonce, deadline];

    // 2023-1-13 更改
    const myContract2 = new state.web3.eth.Contract(
      erc20ContractAbi,
      state.ozcoinContractAddress,
      { from: state.address }
    );
    myContract2.methods.nonces(state.address).call({ from: state.address }, async function (error, result) {
      if (error) return console.log(error)
      let nonce2 = state.web3.utils.fromWei(String(result), unit);
      var rawTransaction = {
        from: state.address,
        // nonce: state.web3.utils.toHex(nonce),
        nonce: nonce2,
        to: state.ozcoinStakeContractAddress,
        value: "0x0",
        data: myContract.methods
          .stake(value, nonce, deadline, v, r, s)
          .encodeABI(),
        chainId: state.chainId
      };
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [rawTransaction],
      });
      if (txHash) {
        if (cb) cb('success')
      } else {
        if (cb) cb('error')
      }
    });

  },
  // pc提取
  async pcRedemption({ state }, { cb }) {
    let nonce = await state.web3.eth.getTransactionCount(
      state.address,
      "pending"
    );
    let myContract = new state.web3.eth.Contract(
      ozcoinStakeExpandAbi,
      state.ozcoinStakeContractAddress,
      {
        from: state.address, // default from address
        gasLimit: 70000,
        gasPrice: 1000000000 // default gas price in wei, 10 gwei in this case
      }
    );
    var rawTransaction = {
      from: state.address,
      nonce: state.web3.utils.toHex(nonce),
      to: state.ozcoinStakeContractAddress,
      value: "0x0",
      data: myContract.methods.redemption().encodeABI(),
      chainId: state.chainId
    };
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [rawTransaction],
    });
    if (txHash) {
      if (cb) cb('success')
    } else {
      if (cb) cb('error')
    }
  },

  // _--------------------------------------------------------------------------------------------------------------------------

  // pc and mobile 获取质押地址
  async getOkcoinStake({ state, commit }) {
    // console.log(new Web3(provider), state.web3, 'new state.web3')
    commit("SAVE_WALLET_INFO", { key: "web3", value: new Web3(provider) });
    let myContract = new state.web3.eth.Contract(
      totoExpandAbi,
      state.totoContractAddress,
      {
        from: state.address // default from address
      }
    );
    myContract.methods.ozcoinStake().call({ from: state.address }, function (error, result) {
      if (!error) {
        commit("SAVE_WALLET_INFO", { key: "ozcoinStakeContractAddress", value: String(result) });
      } else {
        console.log(error);
      }
    });
  },
  // pc and mobile 获取toto质押ozc时的收益率的次数（预计获取多少）和 获取质押的余额
  async totoStakeOzcEarnings({ state, commit }) {
    let myContract = new state.web3.eth.Contract(
      ozcoinStakeExpandAbi,
      state.ozcoinStakeContractAddress,
      {
        from: state.address, // default from address
        gasLimit: 70000,
        gasPrice: 1000000000 // default gas price in wei, 10 gwei in this case
      }
    );
    // 预计收益率
    myContract.options.address = state.address
    myContract.methods
      .settleCount().call({ from: state.address }, function (error, result) {
        if (!error) {
          myContract.methods.countYield(result).call({ from: state.address }, function (error2, result2) {
            // console.log('收益率', error2, result2)
            if (!error2) {
              const num = multiply(multiply(1, result2), 365)
              const stakeRate = Number(num).toFixed(2)
              commit("SAVE_WALLET_INFO", { key: 'stakeRate', value: stakeRate });
            } else {
              // console.log(error2, '预计收益率')
            }
          })
        } else {
          // console.log(error, '获取收益率报错');
        }
      });
    // 质押的余额 toto
    myContract.methods.simulationRedemption().call({ from: state.address }, function (error, result) {
      if (!error) {
        // 这个值存在就可以提取 否则不可以提取
        let ubalance = state.web3.utils.fromWei(String(result[1]), 'ether');
        commit("SAVE_WALLET_INFO", { key: 'totoStakeAmount', value: ubalance });
      } else {
        // console.log('质押的余额toto', error)
      }
    })
    // 质押的余额 ozc
    myContract.methods.getAllAccountByAddress(state.address).call({ from: state.address }, function (error, result) {
      if (!error) {
        // console.log('质押ozc', result)
        let ubalance = state.web3.utils.fromWei(String(Number(result[1])), 'ether');
        commit("SAVE_WALLET_INFO", { key: 'ozcStakeAmount', value: ubalance });
      } else {
        // console.log('质押的余额 ozc', error)
      }
    })
  },
  // 质押
  async stake({ state }, { amount, unit }) {
    let spender = state.ozcoinStakeContractAddress;
    var timestamp = new Date().getTime();
    let deadline = timestamp + 360000;
    let value = state.web3.utils.toWei(amount, unit);
    let nonce = await state.web3.eth.getTransactionCount(
      state.address,
      "pending"
    );
    let permitData = signPremit(
      "OZCoin",
      state.ozcoinContractAddress,
      state.address,
      spender,
      value,
      deadline,
      state.chainId,
      nonce
    );
    let signatureR = await state.web3Provider.send("eth_signTypedData_v4", [
      state.address,
      permitData
    ]);
    // let signatureR = await state.web3Provider.send({
    //     method: 'eth_signTypedData_v4',
    //     params: [ state.address, permitData ],
    // });
    console.log(signatureR, "signatureR");
    let myContract = new state.web3.eth.Contract(
      ozcoinStakeExpandAbi,
      state.ozcoinStakeContractAddress,
      {
        from: state.address, // default from address
        gasLimit: 70000,
        gasPrice: 1000000000 // default gas price in wei, 10 gwei in this case
      }
    );
    console.log(signatureR, "signatureR");
    let r = signatureR.slice(0, 66);
    let s = "0x" + signatureR.slice(66, 130);
    let v = "0x" + signatureR.slice(130, 132);
    let permit = [state.address, spender, value, nonce, deadline];
    console.log(permit, "permit");
    var rawTransaction = {
      from: state.address,
      nonce: state.web3.utils.toHex(nonce),
      to: state.ozcoinStakeContractAddress,
      value: "0x0",
      data: myContract.methods
        .stake(value, nonce, deadline, v, r, s)
        .encodeABI(),
      chainId: state.chainId
    };
    const txHash = await state.web3Provider.send("eth_sendTransaction", [
      rawTransaction
    ]);
    console.log(txHash, "质押返回");
  },
  // 提取
  async redemption({ state }) {
    let nonce = await state.web3.eth.getTransactionCount(
      state.address,
      "pending"
    );
    let myContract = new state.web3.eth.Contract(
      ozcoinStakeExpandAbi,
      state.ozcoinStakeContractAddress,
      {
        from: state.address, // default from address
        gasLimit: 70000,
        gasPrice: 1000000000 // default gas price in wei, 10 gwei in this case
      }
    );
    var rawTransaction = {
      from: state.address,
      nonce: state.web3.utils.toHex(nonce),
      to: state.ozcoinStakeContractAddress,
      value: "0x0",
      data: myContract.methods.redemption().encodeABI(),
      chainId: state.chainId
    };
    state.web3Provider
      .send("eth_sendTransaction", [rawTransaction])
      .then(res => {
        console.log(res, "提取额返回");
      });
    // const txHash = await ethereum.request({
    //     method: 'eth_sendTransaction',
    //     params: [rawTransaction],
    // });
    // console.log(txHash, '提取返回')
  },
  // 获取toto和ozc保有量
  getTotalSupply({ commit }) {
    // toto
    new state.web3.eth.Contract(
      erc20ContractAbi,
      state.totoContractAddress,
      { from: state.address }
    ).methods.totalSupply().call({ from: state.address }, function (error, result) {
      if (!error) {
        let ubalance = state.web3.utils.fromWei(String(result), 'ether');
        commit("SAVE_WALLET_INFO", { key: 'totoSupply', value: ubalance });
      } else {
        console.log(error, '获取保有量报错');
      }
    });
    // ozc
    new state.web3.eth.Contract(
      erc20ContractAbi,
      state.ozcoinContractAddress,
      { from: state.address }
    ).methods.totalSupply().call({ from: state.address }, function (error, result) {
      if (!error) {
        let ubalance = state.web3.utils.fromWei(String(result), 'ether');
        commit("SAVE_WALLET_INFO", { key: 'ozcSupply', value: ubalance });
      } else {
        console.log(error);
      }
    });
  }
}


function initPro(provider, commit) {
  // 链接上触发
  provider.on("connect", () => {
    console.log("connect");
  });
  // 一旦用户直接从他们的钱包断开连接就会触发
  provider.on("disconnect", (code, reason) => {
    console.log(code, reason);
    // localStorage.removeItem("userState");
    commit("SAVE_WALLET_INFO", { key: "status", value: false });
    commit("SAVE_WALLET_INFO", { key: "address", value: "" });
  });
  // 如果用户在其钱包中切换帐户，则会触发
  provider.on("accountsChanged", accounts => {
    if (accounts.length > 0) {
      console.log("accountsChanged", accounts[0]);
      commit("SAVE_WALLET_INFO", { key: "address", value: accounts[0] });
      operCookie.setToken('WALLET_ADDRESS', accounts[0])
    }
  });
  //  如果用户切换其链/网络，则会触发
  provider.on("chainChanged", chainId => {
    console.log("chainChanged");
    commit("SAVE_WALLET_INFO", { key: "chainId", value: chainId });
  });
}

function signPremit(
  tokenName,
  verifyAddr,
  owner,
  spender,
  value,
  deadline,
  chainid,
  nonce
) {
  let types = {
    EIP712Domain: [
      {
        name: "name",
        type: "string"
      },
      {
        name: "version",
        type: "string"
      },
      {
        name: "chainId",
        type: "uint256"
      },
      {
        name: "verifyingContract",
        type: "address"
      }
    ],
    Permit: [
      {
        name: "owner",
        type: "address"
      },
      {
        name: "spender",
        type: "address"
      },
      {
        name: "value",
        type: "uint256"
      },
      {
        name: "nonce",
        type: "uint256"
      },
      {
        name: "deadline",
        type: "uint256"
      }
    ]
  };

  let primaryType = "Permit";
  let domain = {
    name: tokenName,
    version: "1",
    chainId: chainid,
    verifyingContract: verifyAddr
  };
  let message = {
    owner,
    spender,
    value,
    nonce,
    deadline
  };
  let result = JSON.stringify({
    types,
    primaryType,
    domain,
    message
  });
  return result;
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
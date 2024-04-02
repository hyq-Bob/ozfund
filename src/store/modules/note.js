/*
 * @Author: hyq_bob bob.he@autech.one
 * @Date: 2024-03-27 19:50:29
 * @LastEditors: hyq_bob bob.he@autech.one
 * @LastEditTime: 2024-04-01 11:45:10
 * @FilePath: /ozfund-mobile/src/store/modules/note.js
 * @Description: 测试
 */

let addressValidate = isValidAddress(stakeAddr);
if (!addressValidate) return Promise.reject('address is null');
let provider = await getProvider()
const signer = provider.getSigner(); // 签名
// 智能合约地址和ABI
const stakingContractAddress = state.ozcoinAddr;
const stakingContractABI = ozcoinStakeExpandAbi;

// signPremit("OZCoin", stakingContractAddress,stakeAddr, stakingContractABI,EthTransactionWei(amount), new Date().getTime()+360000,chainId,  )
const domain = {
  name: "OZCoin",
  version: "1",
  chainId: chainid,
  verifyingContract: stakingContractAddress
};
const types = {
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
const value = {/* 实际数据 */ };
const signature = await signer._signTypedData(domain, types, value);
const { r, s, v } = ethers.utils.splitSignature(signature);
const ozcoinStakeContract = new ethers.Contract(
  state.ozcoinStakeContractAddress,
  ozcoinStakeExpandAbi,
  signer
);
const nonce = await signer.getTransactionCount();

// 这里的参数应该与你的合约方法相匹配
const tx = await ozcoinStakeContract.stake(value, nonce, deadline, v, r, s);
await tx.wait(); // 等待交易被挖掘

},
// 提取
async withdrawStake({ state }, { amount, withdrawAddr, gasLimit = 1000000 }) {
  let addressValidate = isValidAddress(withdrawAddr);
  if (!addressValidate) return Promise.reject('address is null');
  let provider = await getProvider()
  const signer = provider.getSigner(); // 签名
  // 智能合约地址和ABI
  const stakingContractAddress = state.ozcoinAddr;
  const stakingContractABI = ozcoinStakeExpandAbi;
  // 创建合约实例
  const stakingContract = new ethers.Contract(stakingContractAddress, stakingContractABI, signer);
  // 调用提取函数
  try {
    amount = String(amount)
    const tx = await stakingContract.redemptionDraw(Erc20Transaction(amount), {
      gasLimit: ethers.utils.hexlify(gasLimit) // 设置为1000000，你需要根据实际情况调整这个值
    });
    await tx.wait();
    console.log('提取成功！');
    return Promise.resolve({ success: true })
  } catch (error) {
    console.error('提取失败：', error);
    return Promise.resolve({ success: false })
  }
}

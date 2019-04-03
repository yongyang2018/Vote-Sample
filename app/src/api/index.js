import Web3 from 'web3'
import { abi, networks } from '../../../build/contracts/Vote.json'

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))

// TODO: 正式版要从用户读取账户
const defaultAccount = '0xf8084026dc89D32E36Df5aB67258Bf56FDD97bFe';

// TODO: 正式版要从配置文件读取合约地址和 abi, gasPerTx
// initialize the contract
const contract = new web3.eth.Contract(
  abi, networks['5777'].address
)

// gas per transaction used
const defaultGasPerTx = 3141592

export default web3

export function getVoteslength () {
  return contract.methods['getlength']().call()
}

// 获取所有投票信息
export function getAllVotes () {
    let votes = []
    return getVoteslength().then(
      (lengthBN) =>{
        let promises = []
        let length = web3.utils.toBN(lengthBN).toNumber()
        for(let key = 0 ; key < length; key ++){
          promises.push(getVoteByKey(key).then((vote) => {
            votes[key] = vote
          }))
        }
        return Promise.all(promises)
      }
    ).then(()=>{
      return votes
    })
}

// 根据 id 获取投票信息
export function getVoteByKey(key){
  return contract.methods['selectAll'](key).call()
}

// 保存投票信息
export function saveInfo(title, content, totalcoun){
  const func = contract.methods['saveinfo']
  return func(title, content, totalcoun).send({
    from: defaultAccount,
    gas: defaultGasPerTx,
  })
}

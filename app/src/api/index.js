import Web3 from 'web3'
import { abi, networks } from '../../../build/contracts/Vote.json'

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))

// initialize the contract
const contract = new web3.eth.Contract(
  abi, networks['5777'].address
)

// gas per transaction used
const defaultGasPerTx = 3141592

function bn2Number(bn){
  return web3.utils.toBN(bn).toNumber()
}

export const voteStatus = {
  Open: 1,
  Close: 2,
}

export const voteType = {
  Support: 1,
  Oppose: 0,
}

export const voteHistory ={
  Voted: 1,
  NotNoted: 2,
}

export default web3

// 获取地址
export function getAccounts(){
  return web3.eth.getAccounts()
}

// 获取所有投票信息
export function getVoteInfos (address) {
    let votes = []
    let length = 0
    return contract.methods['getlength']().call(
    ).then(
      (lengthBN) =>{
        let promises = []
        length = bn2Number(lengthBN)
        for(let key = 0 ; key < length; key ++){
          promises.push(getVoteInfoByKey(key).then((vote) => {
            votes[key] = vote
          }))
        }
        return Promise.all(promises)
      }
    )
    .then(() =>{
      let promises = []
      if(address){
        for(let key = 0 ; key < length; key ++){
          promises.push(isVotable(key, address).then((flag) => {
            if (votes[key]){
              votes[key].isVotable = flag
            }
          }))
        }
      }
      return Promise.all(promises)
    })
    .then(()=>{
        for(let v of votes){
          v.oppose = bn2Number(v.oppose)
          v.support = bn2Number(v.support)
          v.totalcoun = bn2Number(v.totalcoun)
          v.id = bn2Number(v.id)
          v.isClosed = v.status === voteStatus.Close
        }
        return votes
    })
}

// 根据 id 获取投票信息
export function getVoteInfoByKey(key){
  return contract.methods['selectAll'](key).call()
}

// 发起投票项
export function createVote(title, content, totalcoun){
  const func = contract.methods['saveinfo']
  return web3.eth.getAccounts().then((res) => {
    return res[0]
  }).then((address) => {
    return new Promise((resolve) => {
      func(title, content, totalcoun).send({
        from: address,
        gas: defaultGasPerTx
      }, resolve)
    })
  })
}

// 进行投票
export function vote(key, type, address){
  return new Promise((resolve) => {
    contract.methods['updatevote'](key, type, address).send({
      from: address,
      gas: defaultGasPerTx,
    }, resolve)
  })
}

// 进行投票
export function isVotable(key,address){
  return contract.methods['checkVotable'](key, address).call()
}

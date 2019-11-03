/*
 * Copyright ©️ 2018 Galt•Project Society Construction and Terraforming Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka)
 *
 * Copyright ©️ 2018 Galt•Core Blockchain Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka) by
 * [Basic Agreement](ipfs/QmaCiXUmSrP16Gz8Jdzq6AJESY1EAANmmwha15uR3c1bsS)).
 */

import CosmosSdkBuilder from '../builders/cosmosSdkBuilder';

const axios = require('axios');
const {weiToDecimals} = require('../utils/common');

const encoding = require('../utils/encoding');

export default class CosmosSdkRpc {
  rpc;

  config;

  cosmosBuilder;

  constructor(rpc, config) {
    this.rpc = rpc;
    this.config = config;
    this.cosmosBuilder = new CosmosSdkBuilder();
  }

  async getBalance(address) {
    return axios({
      method: 'get',
      url: `${this.rpc}/bank/balances/${address}`,
    }).then(response => {
      return response.data && response.data.length ? response.data[0].amount : 0;
    });
  }

  async getMegaBalance(address) {
    return this.getBalance(address).then(cyb => {
      cyb = weiToDecimals(cyb, 6);

      const strSplit = cyb.toString().split('.');
      if (strSplit.length === 1) {
        return cyb;
      }
      return parseFloat(`${strSplit[0]}.${strSplit[1].slice(0, 3)}`);
    });
  }

  async getGigaBalance(address) {
    return this.getBalance(address).then(cyb => {
      cyb = weiToDecimals(cyb, 9);

      const strSplit = cyb.toString().split('.');
      if (strSplit.length === 1) {
        return cyb;
      }
      return parseFloat(`${strSplit[0]}.${strSplit[1].slice(0, 3)}`);
    });
  }

  async getNodeInfo() {
    return axios({
      method: 'get',
      url: `${this.rpc}/node_info`,
    }).then(response => response.data);
  }

  async getNetworkId() {
    return this.getNodeInfo().then(data => data.network);
  }

  async getAccountInfo(address) {
    const addressInfo = await axios({
      method: 'get',
      url: `${this.rpc}/auth/accounts/${address}`,
    });

    if (!addressInfo.data.value) {
      throw 'addressInfo.data.result undefined';
    }
    return addressInfo.data.value;
  }
  
  getKeyPairByPrivateKey(privateKey) {
    return encoding(this.config).importAccount(privateKey);
  }

  async prepareOptions(txOptions, msgOptions) {
    const keyPair = this.getKeyPairByPrivateKey(txOptions.privateKey);
    
    const chainId = await this.getNetworkId();
    const account = await this.getAccountInfo(keyPair.address);

    return _.extend({
      account: {
        address: keyPair.address,
        publicKey: keyPair.publicKey,
        privateKey: keyPair.privateKey,
        accountNumber: account.account_number.toString(),
        sequence: parseInt(account.sequence, 10),
      },
      chainId,
      fee: {
        denom: 'uatom',
        amount: '500',
      },
      memo: '',
    }, msgOptions || {});
  }

  handleResponse(requestPromise) {
    return requestPromise.then(res => {
      if (!res.data) {
        throw new Error('Empty data');
      }
      if (res.data.error) {
        throw res.data.error;
      }
      return res.data;
    })
      .catch(error => {
        console.error('Tx error', error);
        throw error;
      });
  }

  async transfer(txOptions, addressTo, mAmount) {
    const amount = parseFloat(mAmount) * 10 ** 6;
    const options = await this.prepareOptions(txOptions, {
      from: txOptions.address,
      to: addressTo,
      amount,
      denom: 'uatom'
    });

    const txRequest = this.cosmosBuilder.sendRequest(options);

    return this.handleResponse(axios.post(`${this.rpc}/txs`, {
        tx: JSON.parse(txRequest.json),
        mode: 'sync',
    }));
  }
}

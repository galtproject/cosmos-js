/*
 * Copyright ©️ 2018 Galt•Project Society Construction and Terraforming Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka)
 *
 * Copyright ©️ 2018 Galt•Core Blockchain Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka) by
 * [Basic Agreement](ipfs/QmaCiXUmSrP16Gz8Jdzq6AJESY1EAANmmwha15uR3c1bsS)).
 */

const { TypeFactory, Types } = require('js-amino');

const MsgSend = TypeFactory.create('MsgSend', [
  {
    name: 'from_address',
    type: Types.String,
  },
  {
    name: 'to_address',
    type: Types.String,
  },
  {
    name: 'amount',
    type: Types.ArrayStruct,
  },
]);

const MsgMultiSend = TypeFactory.create('cosmos-sdk/MsgMultiSend', [
  {
    name: 'inputs',
    type: Types.ArrayStruct,
  },
  {
    name: 'outputs',
    type: Types.ArrayStruct,
  },
]);

module.exports = {
  MsgMultiSend,
  MsgSend,
};

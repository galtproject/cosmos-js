/*
 * Copyright ©️ 2018 Galt•Project Society Construction and Terraforming Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka)
 *
 * Copyright ©️ 2018 Galt•Core Blockchain Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka) by
 * [Basic Agreement](ipfs/QmaCiXUmSrP16Gz8Jdzq6AJESY1EAANmmwha15uR3c1bsS)).
 */

var _require = require('js-amino'),
    TypeFactory = _require.TypeFactory,
    Types = _require.Types;

var MsgSend = TypeFactory.create('MsgSend', [{
  name: 'from_address',
  type: Types.String
}, {
  name: 'to_address',
  type: Types.String
}, {
  name: 'amount',
  type: Types.ArrayStruct
}]);
var MsgMultiSend = TypeFactory.create('cosmos-sdk/MsgMultiSend', [{
  name: 'inputs',
  type: Types.ArrayStruct
}, {
  name: 'outputs',
  type: Types.ArrayStruct
}]);
module.exports = {
  MsgMultiSend: MsgMultiSend,
  MsgSend: MsgSend
};
//# sourceMappingURL=tx.js.map

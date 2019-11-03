/*
 * Copyright ©️ 2018 Galt•Project Society Construction and Terraforming Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka)
 *
 * Copyright ©️ 2018 Galt•Core Blockchain Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka) by
 * [Basic Agreement](ipfs/QmaCiXUmSrP16Gz8Jdzq6AJESY1EAANmmwha15uR3c1bsS)).
 */

export class NetConfig {
  PREFIX_BECH32_ACCADDR;

  PREFIX_BECH32_ACCPUB;
  
  DEFAULT_ENCODING;
  
  MAXGAS = 200000;

  DERIVATION_CHAIN_INDEX = '118';
  
  constructor(_PREFIX_BECH32_ACCADDR, _PREFIX_BECH32_ACCPUB, _DEFAULT_ENCODING = 'bech32') {
    this.PREFIX_BECH32_ACCADDR = _PREFIX_BECH32_ACCADDR;
    this.PREFIX_BECH32_ACCPUB = _PREFIX_BECH32_ACCPUB;
    this.DEFAULT_ENCODING = _DEFAULT_ENCODING;
  }
  
  setMaxGas(_MAXGAS) {
    this.MAXGAS = _MAXGAS;
  }
  
  setDerivation(_DERIVATION_CHAIN_INDEX) {
    this.DERIVATION_CHAIN_INDEX = _DERIVATION_CHAIN_INDEX;
  }
}

export class NetEncodingEnum {
  static BECH32 = 'bech32';
  static HEX = 'hex';
}

const { EncryptStorage } = require('encrypt-storage');

const encryptStorage = new EncryptStorage('TICKET@M0N0L1T0_W3B_S3CK3T_K3Y',
  {
    prefix: null,
    storageType: 'localStorage',
    stateManagementUse: false
  });

module.exports = encryptStorage
import { AES, enc } from 'crypto-js';
import * as _ from 'lodash';

export function decryptPwd(pwd: string) {
  if (_.isEmpty(pwd)) return pwd;

  const aes = AES.decrypt(pwd, process.env.SHARED_KEY_AES).toString(enc.Utf8);

  return aes;
}

export function encryptPwd(data: string) {
  if (_.isEmpty(data)) return data;
  const aes = AES.encrypt(data, process.env.SHARED_KEY_AES).toString();
  return aes.toString();
}

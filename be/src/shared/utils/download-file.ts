import axios from 'axios';

export const downloadFile = async (url: string) => {
  const response = await axios.get(url, {
    responseType: 'arraybuffer',
    auth: {
      username: process.env.JASPER_USERNAME,
      password: process.env.JASPER_PASSWORD,
    },
  });
  const buffer = Buffer.from(response.data);

  return buffer;
};

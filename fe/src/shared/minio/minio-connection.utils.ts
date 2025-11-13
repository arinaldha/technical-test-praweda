const Minio = require('minio');

export function minioConnection(): any {
  return new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: parseInt(process.env.MINIO_PORT),
    useSSL: false,
    // useSSL: process.env.MINIO_USESSL.toUpperCase() == "TRUE",
    accessKey: process.env.MINIO_ACCESSKEY,
    secretKey: process.env.MINIO_SECRETKEY,
    // endPoint: 'devminio.soedarpo.id',
    // useSSL: process.env.MINIO_USESSL.toUpperCase() == "TRUE",
    // accessKey: 'PsiUser',
    // secretKey: 'dev_psi2022',
  });
}

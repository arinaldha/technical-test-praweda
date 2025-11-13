export const config = {
  MINIO_ENDPOINT: process.env.MINIO_ENDPOINT ?? 'minio.soedarpo.id',
  MINIO_PORT: process.env.MINIO_PORT ?? 9000,
  MINIO_PORT_URL: process.env.MINIO_PORT_URL ?? 7443,
  MINIO_ACCESSKEY: process.env.MINIO_ACCESSKEY ?? 'PsiUser',
  MINIO_SECRETKEY: process.env.MINIO_SECRETKEY ?? 'dev_psi2022',
  MINIO_BUCKET: process.env.MINIO_BUCKET ?? 'psi-ops-dev',
};

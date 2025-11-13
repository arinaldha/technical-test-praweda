const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        domains: [
            "psi-studio.soedarpo.id",
            "cdn-icons-png.flaticon.com",
            "minio.soedarpo.id",
            "devminio.soedarpo.id",
        ],
        contentDispositionType: "attachment",
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
};

export default nextConfig;

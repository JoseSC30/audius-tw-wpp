module.exports = {
    reactStrictMode: false,
    // webpack5: true,
    webpack: (config) => {
        config.resolve.fallback = {fs: false, os: false, path: false};
        return config;
    },
};
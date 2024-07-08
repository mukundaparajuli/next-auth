/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        // Add your custom webpack configuration here
        config.module.rules.push({
            test: /\.html$/,
            use: 'html-loader'
        });

        return config; // Make sure to return the config object
    },
};

export default nextConfig;

import { Configuration } from 'webpack';

module.exports = {
    reactStrictMode: true,
    webpack: (config: Configuration) => {
        config.module?.rules?.push({
            test: /\.(glsl|vs|fs|vert|frag)$/,
            use: ['raw-loader', 'glslify-loader'],
        });

        return config;
    }
};
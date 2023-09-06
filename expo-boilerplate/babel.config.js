module.exports = function(api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            ["nativewind/babel"],
            ['expo-router/babel'],
            ['react-native-reanimated/plugin'],
            ['module-resolver',
                {
                    extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
                    root: ['.'],
                    alias: {
                        '@root': './src',
                        '@auth': './src/auth',
                        '@app': './src/app',
                    },
                },
            ],
        ]
    };
};

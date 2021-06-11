let mix = require('laravel-mix');

const webpack = require('webpack');
require('laravel-mix-stylelint');
require('laravel-mix-eslint');
//require('laravel-mix-purgecss');

let webpackConfig = {
    resolve: {
        //Add aliases for the external libraries here
        alias: {},
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: 'popper.js/dist/umd/popper.js',
        }),
    ],
};

mix.sass('resources/assets/sass/app.scss', 'public/css')
    .js('resources/assets/js/app.js', 'public/js')
    .copyDirectory('resources/assets/images', 'public/images')
    .copyDirectory('resources/assets/fonts', 'public/fonts')
    /*.purgeCss({
        folders: ['resources'],
        whitelistPatterns: [/vs/, /vs$/, /select2/, /select2$/, /el/, /el$/, /fa/],
        whitelistPatternsChildren: [/vs/, /vs$/, /select2/, /select2$/, /el/, /el$/, /fa/],
    })*/;

mix.options({
    processCssUrls: false,
});

if (mix.inProduction()) {
    //mix.version();
    mix.options({
        clearConsole: true,
        terser: {
            terserOptions: {
                compress: {
                    drop_console: true,
                },
            },
        },
        cssNano: {
            discardComments: {
                removeAll: true,
            },
        },
    });
} else {
    mix.sourceMaps();
    webpackConfig.devtool = 'inline-source-map';
}

mix.stylelint({
    files: ['**/*.scss', '**/*.sass', '**/*.css'],
});

mix.browserSync({
    proxy: 'http://miami.test',
    changeOrigin: true,
});

mix.webpackConfig(webpackConfig);

mix.options({
    postCss: [
        require('postcss-discard-comments')({
            removeAll: true,
        }),
    ],
    uglify: {
        uglifyOptions: {
            comments: false,
        },
    },
});

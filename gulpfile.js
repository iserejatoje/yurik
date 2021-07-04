let preprocessor = "sass", // Preprocessor (sass, less, styl); 'sass' also work with the Scss syntax in blocks/ folder.
    fileswatch = "html,htm,txt,json,md,woff2"; // List of files extensions for watching & hard reload

const {src, dest, parallel, series, watch} = require("gulp");
const browserSync = require("browser-sync").create();
const bssi = require("browsersync-ssi");
const ssi = require("ssi");
const webpack = require("webpack-stream");
const sass = require("gulp-sass");
const sassglob = require("gulp-sass-glob");
const cleancss = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const rsync = require("gulp-rsync");
const del = require("del");
const svgSprite = require('gulp-svg-sprite');

function sprites() {
    return src('app/svg/*.svg')
        .pipe(svgSprite({
                mode: {
                    stack: {
                        sprite: "../app.svg"
                    },
                },
            }
        ))
        .pipe(dest('app/sprites/'));
}

function browsersync() {
    browserSync.init({
        server: {
            baseDir: "app/",
            middleware: bssi({baseDir: "app/", ext: ".html"}),
        },
        ghostMode: {clicks: false},
        notify: false,
        online: true
    });
}

function scripts() {
    return src(["app/js/*.js", "!app/js/*.min.js"])
        .pipe(
            webpack({
                mode: "production",
                // mode: "development",
                performance: {hints: false},
                module: {
                    rules: [
                        {
                            test: /\.(js)$/,
                            exclude: /(node_modules)/,
                            loader: "babel-loader",
                            query: {
                                presets: ["@babel/env"],
                                plugins: ["babel-plugin-root-import"],
                            },
                        },
                    ],
                },
            })
        )
        .on("error", function handleError() {
            this.emit("end");
        })
        .pipe(rename("app.min.js"))
        .pipe(dest("app/js"))
        .pipe(browserSync.stream());
}

function styles() {
    return src([
        `app/styles/*.*`,
        `!app/styles/_*.*`,
    ])
        .pipe(eval(`sassglob`)())
        .pipe(eval(sass)())
        .pipe(
            autoprefixer({overrideBrowserslist: ["last 10 versions"], grid: true})
        )
        .pipe(
            cleancss({
                level: {1: {specialComments: 0}} /* format: 'beautify' */,
            })
        )
        .pipe(rename({suffix: ".min"}))
        .pipe(dest("app/css"))
        .pipe(browserSync.stream());
}

function buildcopy() {
    return src(
        [
            "{app/js,app/css}/*.min.*",
            "app/images/**/*.*",
            "app/README.md",
            "app/fonts/*.*",
            "app/sprites/*.*",
            "!app/images/src/**/*",
            "app/fonts/**/*",
        ],
        {base: "app/"}
    ).pipe(dest("docs"));
}

async function buildhtml() {
    let includes = new ssi("app/", "docs/", "/**/*.html");
    includes.compile();
    del("docs/parts", {force: true});
}

function cleandocs() {
    return del("docs/**/*", {force: true});
}

function deploy() {
    return src("docs/").pipe(
        rsync({
            root: "docs/",
            hostname: "username@yousite.com",
            destination: "yousite/public_html/",
            // clean: true, // Mirror copy with file deletion
            include: [
                /* '*.htaccess' */
            ], // Included files to deploy,
            exclude: ["**/Thumbs.db", "**/*.DS_Store"],
            recursive: true,
            archive: true,
            silent: false,
            compress: true,
        })
    );
}

function startwatch() {
    watch(`app/styles/**/*`, {usePolling: true}, styles);
    watch(
        ["app/js/**/*.js", "!app/js/**/*.min.js"],
        {usePolling: true},
        scripts
    );
    watch(
        "app/images/src/**/*.{jpg,jpeg,png,webp,svg,gif}",
        {usePolling: true},
    );
    watch(`app/**/*.{${fileswatch}}`, {usePolling: true}).on(
        "change",
        browserSync.reload
    );
}

exports.scripts = scripts;
exports.styles = styles;
exports.deploy = deploy;
exports.sprites = sprites;
exports.assets = series(scripts, styles);
exports.build = series(
    cleandocs,
    scripts,
    styles,
    buildcopy,
    buildhtml
);

exports.default = series(
    scripts,
    styles,
    parallel(browsersync, startwatch)
);

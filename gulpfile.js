const gulp = require('gulp');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const sass = require('gulp-sass');

const destPath = "C:\\OpenServer\\domains\\vue.localdev\\admin";

gulp.task("copy-html", () => {
    return gulp.src("./app/index.html")
        .pipe(gulp.dest(destPath));
});

gulp.task("build-sass", () => {
    return gulp.src("./app/scss/**/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(destPath));
});

gulp.task("build-js", () => {
    return browserify('./app/src/main.js', { debug: true })
        .transform("babelify", {presets: ["@babel/preset-env"], sourceMaps: true})
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest(destPath));
});

gulp.task("copy-api", () => {
    return gulp.src("./app/api/**/*.*")
        .pipe(gulp.dest(destPath + "\\api\\"));
});

gulp.task("copy-assets", () => {
    return gulp.src("./app/assets/**/*.*")
        .pipe(gulp.dest(destPath + "\\assets\\"));
});

gulp.task("watch", () => {
    gulp.watch("./app/index.html", gulp.parallel("copy-html"));
    gulp.watch("./app/src/**/*.js", gulp.parallel("build-js"));
    gulp.watch("./app/scss/**/*.scss", gulp.parallel("build-sass"));
    gulp.watch("./app/api/**/*.*", gulp.parallel("copy-api"));
    gulp.watch("./app/assets/**/*.*", gulp.parallel("copy-assets"));
});

gulp.task("build", gulp.parallel("copy-html", "copy-api", "copy-assets", "build-js", "build-sass"));

gulp.task("default", gulp.parallel("build", "watch"));
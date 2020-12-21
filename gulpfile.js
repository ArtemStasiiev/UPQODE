let gulp = require("gulp");
let rename = require("gulp-rename");
let sass = require("gulp-sass");
let autoprefixer = require("gulp-autoprefixer");
let sourcemaps = require("gulp-sourcemaps");
let browserSync = require("browser-sync").create();

const css_style = (done) => {
  gulp
    .src("./scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        errorLogToConsole: true,
        outputStyle: "compressed",
      })
    )
    .on("error", console.error.bind(console))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./css/"))
    .pipe(browserSync.stream());

  done();
};

const sync = (done) => {
  browserSync.init({
    server: {
      baseDir: "./",
    },
    port: 3000,
  });
  done();
};

const browserReload = (done) => {
  browserSync.reload();
  done();
};

const watchFiles = () => {
  gulp.watch("./scss/**/*", css_style);
  gulp.watch("./**/*.html", browserReload);
  gulp.watch("./**/*.js", browserReload);
};

gulp.task("default", gulp.parallel(sync, watchFiles));
gulp.task(sync);

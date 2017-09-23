//引包
var gulp=require('gulp');
var sass = require('gulp-sass');
var less=require('gulp-less');
var uglifycss=require('gulp-uglifycss');
var autoprefixer=require('gulp-autoprefixer');
var csscomb=require('gulp-csscomb');
var uglyfly = require('gulp-uglyfly');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();

gulp.task('style',function(){
	gulp.src(['dist/css/*.css','!src/css/_*.less'])  //入口文件,排除掉以下划线开始的文件
	 .pipe(autoprefixer({
      	browsers: ['Android 2.3',
      	'Android >= 4',
     	'Chrome >= 20',
      	'Firefox >= 24', // Firefox 24 is the latest ESR 
      	'Explorer >= 8',
      	'iOS >= 6',
      	'Opera >= 12',
      	'Safari >= 6'],
            cascade: false
      
   		 }))
	 .pipe(csscomb())              //调整顺序
	 .pipe(uglifycss())            //压缩
	 .pipe(gulp.dest('src/css'))  //出口文件
})

//2.JS 合并   压缩   混淆
gulp.task('script',function () {  
    gulp.src('dist/js/*.js')
    .pipe(uglyfly()) //压缩、混淆
    .pipe(gulp.dest('src/js')) //出口

})

//3.图片复制
gulp.task('image',function () {  
    gulp.src('dist/img/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('src/img'))

})

//4.html压缩
gulp.task('html', function() {
  gulp.src('dist/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('src'))
});

//5.浏览器任更新
var reload=browserSync.reload;
gulp.task('server',function(){
	browserSync.init({
        server: {
            baseDir: "./src/"
        }
    });
    //监听
    gulp.watch("dist/css/*.css",['style']).on("change", reload);
    gulp.watch("dist/js/*.js",['script']).on("change", reload);
    
    gulp.watch("dist/img/*.*",['image']).on("change", reload);
    gulp.watch("dist/*.html",['html']).on("change", reload);
})

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

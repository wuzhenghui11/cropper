const gulp = require('gulp');
const uglify = require('gulp-uglify');
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const minify = require('gulp-clean-css');
const rename = require('gulp-rename');
const nodemon = require('gulp-nodemon');
const yargs = require('yargs').argv;
const livereload = require('gulp-livereload');
const connect = require('gulp-connect');
// const proxy = require('http-proxy-middleare');
const opn = require('opn');
const os = require('os');

let config = {
	port: 3002,
	style: {

	},
	script: {

	}
}

//获得电脑IP地址
let getIPAddress = () => {
	let interfaces = os.networkInterfaces();
	for(let i in interfaces){
		let iface = interfaces[i];
		for(let l = 0; l  < iface.length; l++){
			let alias = iface[l];
			if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
				return alias.address;
			}
		}
	}
}
console.log('server running at http://' + getIPAddress() + ':' + config.port + ' ---gulp-connect');

gulp.task('connect', (done) => {
	connect.server({
		root: ['views', 'static'],
		port: config.port,
		livereload: {
			port: 36729
		}
	});
	done();
});

gulp.task('jsmin', (done) => {
	gulp.src(['./static/js/app/*.js'])
		/* .pipe(sourcemaps.init())
		.pipe(uglify({
			// mangle: true,//类型：Boolean 默认：true 是否修改变量名
			mangle: {except: ['require', 'exports', 'module', '$']} // 排除混淆关键字
		}))
		.pipe(sourcemaps.write())
		.pipe(rename((path) => {
			path.basename += '.min';
		}))
		.pipe(gulp.dest('./dist/js/app')) */
		.pipe(connect.reload());
	done();
});
gulp.task('less', (done) => {
	gulp.src(['./static/css/*.less'])
		.pipe(less())
		.pipe(minify())
		.pipe(rename((path) => {
			path.basename += '.min';
		}))
		.pipe(gulp.dest('./dist/css'))
		.pipe(connect.reload());
	done();
});

gulp.task('html', (done) => {
	gulp.src(['./views/*.html'])
		.pipe(connect.reload());
	done();
});

gulp.task('watch', (done) => {
	gulp.watch(['./static/js/app/*.js'], gulp.parallel('jsmin'));
	gulp.watch(['./static/css/*.less'], gulp.parallel('less'));
	gulp.watch(['./views/*.html'], gulp.parallel('html'));
	done();
});

gulp.task('express', (done) => {
	// nodemon({
	// 	script: './bin/www'
	// })
	done();
});

gulp.task('server', gulp.series('watch', 'connect', 'express', function(done){
	getIPAddress();
	opn('http://localhost:' + config.port);
	done()
}));







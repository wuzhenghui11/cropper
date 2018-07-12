require.config({
	baseUrl: 'js/lib', // 根目录
	paths:{
		vue: 'vue',
		vuex: 'vuex'
	},
	shim:{
		'vue': {
			exports: 'Vue'
		}
	}
});








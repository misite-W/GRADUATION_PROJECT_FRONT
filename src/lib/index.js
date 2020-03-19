import Vue from "vue";
/**
 * 公共方法类
 * 
 */

/**
 * 路由跳转方法，支持name 跳转，和path跳转
 * 传入参数为对象：path、name、query
 * 
 * 优先 path 跳转，path 为空，则取name
 * 支持传入query 参数
 */
Vue.prototype.moveToPage = function ({ path, name, query }) {
	let param = {
		query
	};
	path ? (param.path = path) : (param.name = name);
	this.$router.push({ ...param });
}

/**
 *  静态资源下载方法
 * file:name,url
 */
import api from "../api"
let down_url = api.publicApi.downLoad;
Vue.prototype.$$download = function (file) {
	this.$dialog.alert({
		title: "附件下载",
		message: down_url + file.filePath,
		confirmButtonText: "复制链接进行下载~"
	})
}

/**
 *  图片预览 - 不支持下载
 */
import { ImagePreview } from 'vant';
Vue.use(ImagePreview);
Vue.prototype.$$imgPreview = function (fileList) {
	fileList = fileList.map((v)=>{
		return down_url + v
	})
	ImagePreview([...fileList]);
}


/**
 *  展示 和 隐藏 ，全局蒙层
 */
Vue.prototype.$$overlay = function(){
	this.$store.dispatch('changeOverlay');
}
define("html5_imgupload",["avalon-min"], function(avalon){
	var html5_img_upload=function(options){
		this.init(options);
	}
	html5_img_upload.prototype = {
		init : function(options) {
			//如果有自定义属性，覆盖默认属性
			avalon.mix(html5_img_upload.prototype,options);
			this.init_events();
		},
		init_events : function() {
			var _this=this;
			avalon.bind($(this.add_btn),'change',function(e) {
				_this.get_files(e);
			});
		},
		file_filter:[],
		ori_images:[],
		add_btn:null,
		upload_btn:null,
		max_upload_num:9,
		onSelect:function(file_filter){},
		_start:0,//已经读取图片数量
		filter:function(files) {
			var arrFiles=[];
			for (var i=0,file;file=files[i];i++){
				if(this._start+i<this.max_upload_num){
					if(file.type.indexOf("image")==0||(!file.type&&/\.(?:jpg|png|gif)$/.test(file.name)))
						arrFiles.push(file);
					else {
						alert('文件'+file.name+'不是图片');
					}
				}else{
					alert('一次最多能上传'+this.max_upload_num+'张图片');
					break;
				}
			}
			return arrFiles;
		},
		get_files:function(e) {
			var files=e.target.files||e.dataTransfer.files;
			this.file_filter=this.file_filter.concat(this.filter(files));
			this.onSelect(this.file_filter);
		},
		destroy_hook:function(){},
		_destroy:function(){
			this.file_filter=[];
			$(this.add_btn).value='';
			this.ori_images=[];
			this._start=0;
			this.destroy_hook();
		},
		upload:function(i,file_filter){}
	};
	return html5_img_upload;
});
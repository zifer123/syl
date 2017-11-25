<template>
  <div>
    <div id="console"></div>
    <h4>您所选择的文件列表：</h4>
    <div id="ossfile">你的浏览器不支持flash,Silverlight或者HTML5！</div>
    <br/>
    <div class="uploadBox" id="container">
      <a id="selectfiles" href="javascript:void(0);" class='input btn'>选择文件</a>
      <a id="postfilessss" href="javascript:void(0);" class='btn'>开始上传</a>
      <div>
        <i class="el-icon-upload" style="font-size: 50px;"></i>
        <p>点击上传</p>
      </div>
    </div>

    <div class="imgs" v-for="img in imgs" id="">
      <img :src="img.src" alt="">
      <el-progress type="circle" :percentage="img.percent"></el-progress>
      <el-tag v-text="img.description" type="success">正在上传</el-tag>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        postDatas: {
          accessid: '',
          accesskey: '',
          host: '',
          policyBase64: '',
          signature: '',
          callbackbody: '',
          filename: '',
          key: '',
          expire: '',
          g_object_name: '',
          g_object_name_type: ''
        },//接受参数发送到oss的参数
        postDatas2: {
          userId: 1,
          type: 4,
          fileSuffix: '.MP4',
          callbackBody: {
            title: '123213',
            content: '345',
            level: '1',
            userId: '139',
            videoDate: '3',
            groupId: '1'
          },
          url: '/web/admin/uploadVideoFile'
        },//发送java服务器的参数
        imgs: [] //上传图片的集合
      }
    },
    methods: {
      getVal(e) {
        let _this = this;
        let file = e.target.files[0];
        console.log(e.target.files);
        console.log(file);
        let fileReader = new FileReader();
        let url = fileReader.readAsDataURL(file);
        fileReader.onloadend = function(ev) {
          _this.imgs.push(ev.target.result);
        }
      }
    },
    activated() {
      let _this =this;
      let uploader = new plupload.Uploader({
        runtimes : 'html5,flash,silverlight,html4',
        browse_button : 'selectfiles',
        //multi_selection: false,
        container: document.getElementById('container'),
        flash_swf_url : 'lib/plupload-2.1.2/js/Moxie.swf',
        silverlight_xap_url : 'lib/plupload-2.1.2/js/Moxie.xap',
        url : 'http://oss.aliyuncs.com',

        init: {
          PostInit: function() {
            document.getElementById('ossfile').innerHTML = '';
            document.getElementById('postfilessss').onclick = function() {
              _this.$http.get('http://ec2-52-80-50-159.cn-north-1.compute.amazonaws.com.cn:9013/web/content/getwebAliyunKey',{
                params: _this.postDatas2
              }).then(function(body) {
                let results = body.data.data;
                uploader.setOption({
                  'url': results.host,
                  'multipart_params': {
                    'key': results.filePath,
                    'policy': results.policy,
                    'OSSAccessKeyId': results.accessid,
                    'success_action_status': '200',
                    'callback': results.callback,
                    'signature': results.signature
                  }
                });
                uploader.start();
              });
            };
          },

          FilesAdded: function(up, files) {
            let native = files[0].getNative();
            let fileReader = new FileReader();
            fileReader.readAsDataURL(native);
            fileReader.onloadend = function(ev) {
              _this.imgs.push({
                id:  files[0].id,
                src: ev.target.result,
                percent: 0,
                description: ''
              });
            }
            document.getElementById('postfilessss').click();
          },

          BeforeUpload: function(up, file) {
//            alert('before');
//            up.start()
//              alert(2);
//            _this.$http.get('http://ec2-52-80-50-159.cn-north-1.compute.amazonaws.com.cn:9010/app/content/getwebAliyunKey.do',{
//              params: _this.postDatas2
//            }).then(function(body) {
//              let results = body.data.data;
//              console.log(body);
//              up.setOption({
//                'url': results.host,
//                'multipart_params': {
//                  'key': results.filePath,
//                  'policy': results.policy,
//                  'OSSAccessKeyId': results.accessid,
//                  'success_action_status': '200',
//                  'callback': results.callback,
//                  'signature': results.signature
//                }
//              });
//
//            })
//            set_upload_param(up, file.name, true);
          },

          UploadProgress: function(up, file) {
            let id = file.id;
            let index = '';
            for(let i = 0;i<_this.imgs.length;i++) {
              if(id == _this.imgs[i].id) {
                index = i;
              }
            }
            _this.imgs[index].percent = file.percent;
          },

          FileUploaded: function(up, file, info) {
            let id = file.id;
            let index = '';
            for(let i = 0;i<_this.imgs.length;i++) {
              if(id == _this.imgs[i].id) {
                index = i;
              }
            }
            if (info.status == 200)
            {
              document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = 'upload to oss success, object name:' + get_uploaded_object_name(file.name) + ' 回调服务器返回的内容是:' + info.response;
            }
            else if (info.status == 203)
            {
              _this.imgs[index].description = '上传成功';
              //document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '上传到OSS成功，但是oss访问用户设置的上传回调服务器失败，失败原因是:' + info.response;
            }
            else
            {
              document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
            }
          },

          Error: function(up, err) {
            if (err.code == -600) {
              document.getElementById('console').appendChild(document.createTextNode("\n选择的文件太大了,可以根据应用情况，在upload.js 设置一下上传的最大大小"));
            }
            else if (err.code == -601) {
              document.getElementById('console').appendChild(document.createTextNode("\n选择的文件后缀不对,可以根据应用情况，在upload.js进行设置可允许的上传文件类型"));
            }
            else if (err.code == -602) {
              document.getElementById('console').appendChild(document.createTextNode("\n这个文件已经上传过一遍了"));
            }
            else
            {
              document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
            }
          }
        }
      });
      uploader.init();
    }
  }
</script>

<style>
  .uploadBox {
    position: relative;
    width: 200px;
    height: 200px;
    border: 1px dotted #ccc;
  }
  .uploadBox .input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 2;
    cursor: pointer;
  }
  .uploadBox .btn {
    opacity: 0;
  }
  .uploadBox div {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 1;
    margin-left: -32px;
    margin-top: -33px;
    text-align: center;
  }
  .imgs {
    display: flex;
    align-items: center;
  }
  .imgs img {
    width: 126px;
    height: 126px;
  }
</style>

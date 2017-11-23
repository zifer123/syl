<template>
  <div>
    <div id="console"></div>
    <h4>您所选择的文件列表：</h4>
    <div id="ossfile">你的浏览器不支持flash,Silverlight或者HTML5！</div>
    <br/>
    <div id="container">
      <a id="selectfiles" href="javascript:void(0);" class='btn'>选择文件</a>
      <a id="postfiles" href="javascript:void(0);" class='btn'>开始上传</a>
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
          callbackBody: JSON.stringify({
            filePath: '/467',
            title: '123',
            level: '1',
            userId: '139',
            videoDate: '3',
            groupId: '1',
            content: "撒旦"
          })
        }//发送java服务器的参数
      }
    },
    methods: {

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

        filters: {
          mime_types : [ //只允许上传图片和zip文件
            { title : "Image files", extensions : "jpg,gif,png,bmp" },
            { title : "Zip files", extensions : "zip,rar" }
          ],
          max_file_size : '10mb', //最大只能上传10mb的文件
          prevent_duplicates : true //不允许选取重复文件
        },

        init: {
          PostInit: function() {
            document.getElementById('ossfile').innerHTML = '';
            document.getElementById('postfiles').onclick = function() {
              _this.$http.get('http://ec2-52-80-50-159.cn-north-1.compute.amazonaws.com.cn:9010/app/content/getwebAliyunKey.do',{
                params: _this.postDatas2
              }).then(function(body) {
                let results = body.data.result;
                console.log(results);
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
                uploader.start()
              });
              return false;
            };
          },

          FilesAdded: function(up, files) {
            plupload.each(files, function(file) {
              document.getElementById('ossfile').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>'
                +'<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>'
                +'</div>';
            });
          },

          BeforeUpload: function(up, file) {
              alert(2);
            _this.$http.get('http://ec2-52-80-50-159.cn-north-1.compute.amazonaws.com.cn:9010/app/content/getwebAliyunKey.do',{
              params: _this.postDatas2
            }).then(function(body) {
              let results = body.data.result;
              up.setOption({
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
              up.start()
            })
//            set_upload_param(up, file.name, true);
          },

          UploadProgress: function(up, file) {
            var d = document.getElementById(file.id);
            d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
            var prog = d.getElementsByTagName('div')[0];
            var progBar = prog.getElementsByTagName('div')[0]
            progBar.style.width= 2*file.percent+'px';
            progBar.setAttribute('aria-valuenow', file.percent);
          },

          FileUploaded: function(up, file, info) {
            if (info.status == 200)
            {
              document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = 'upload to oss success, object name:' + get_uploaded_object_name(file.name) + ' 回调服务器返回的内容是:' + info.response;
            }
            else if (info.status == 203)
            {
              document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '上传到OSS成功，但是oss访问用户设置的上传回调服务器失败，失败原因是:' + info.response;
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

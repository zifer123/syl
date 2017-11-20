<template>
  <div>
    <form name=theform>
      <input type="radio" name="myradio" value="local_name" checked=true/> 上传文件名字保持本地文件名字
      <input type="radio" name="myradio" value="random_name" /> 上传文件名字是随机文件名
      <br/>
      上传到指定目录:<input type="text" id='dirname' placeholder="如果不填，默认是上传到根目录" size=50>
    </form>

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
        postData1: {
          userId: '226',
          type: 4,
          fileSuffix: '.mp4'
        },
        postData2: {
          accessid: '',
          accesskey: '',
          host: ''
        }
      }
    },
    methods: {

    },
    created() {
      this.$http.post('/api/content/getwebAliyunKey.do?userId= 226&type=4&fileSuffix=.mp4',this.postData1).then(function(body) {
        console.log(body);

//        var accessid = body.data.result.accessid;
//        var accesskey = body.data.result.policy;
//        var host = body.data.result.host;
        var callbackBody = body.data.result.callback;
        var dirName = body.data.result.dir;
        var accessid = '6MKOqxGiGU4AUk44';
        var accesskey = 'ufu7nS8kS59awNihtjSonMETLI0KLy';
        var host = 'http://post-test.oss-cn-hangzhou.aliyuncs.com';
//        var callbackBody = 'http://ssss-test.oss-cn-hangzhou.aliyuncs.com';
        var title = '11111';

        var g_dirname = '';
        var g_object_name = '';
        var g_object_name_type = '';
        var new_multipart_params = '';
        var dir = '';
        var pos = '';
        var suffix = '';
        var tmp_name='';

        var policyText = {
          "expiration": "2020-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
          "conditions": [
            ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
          ]
        };

        var policyBase64 = Base64.encode(JSON.stringify(policyText))
        var message = policyBase64
        var bytes = Crypto.HMAC(Crypto.SHA1, message, accesskey, { asBytes: true }) ;
        var signature = Crypto.util.bytesToBase64(bytes);

        function check_object_radio() {
          var tt = document.getElementsByName('myradio');
          for (var i = 0; i < tt.length ; i++ )
          {
            if(tt[i].checked)
            {
              g_object_name_type = tt[i].value;
              break;
            }
          }
        }

        function get_dirname()
        {
          dir = document.getElementById("dirname").value;
          if (dir != '' && dir.indexOf('/') != dir.length - 1)
          {
            dir = dir + '/'
          }
          //alert(dir)
          g_dirname = dir
        }

        function random_string(len) {
          len = len || 32;
          var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
          var maxPos = chars.length;
          var pwd = '';
          for (var i = 0; i < len; i++) {
            pwd += chars.charAt(Math.floor(Math.random() * maxPos));
          }
          return pwd;
        }

        function get_suffix(filename) {
          pos = filename.lastIndexOf('.')
          suffix = ''
          if (pos != -1) {
            suffix = filename.substring(pos)
          }
          return suffix;
        }

        function calculate_object_name(filename)
        {
          if (g_object_name_type == 'local_name')
          {
            g_object_name += "${filename}"
          }
          else if (g_object_name_type == 'random_name')
          {
            suffix = get_suffix(filename)
            g_object_name = g_dirname + random_string(10) + suffix
          }
          return ''
        }

        function get_uploaded_object_name(filename)
        {
          if (g_object_name_type == 'local_name')
          {
            tmp_name = g_object_name
            tmp_name = tmp_name.replace("${filename}", filename);
            return tmp_name
          }
          else if(g_object_name_type == 'random_name')
          {
            return g_object_name
          }
        }

        function set_upload_param(up, filename, ret)
        {
          g_object_name = g_dirname;
          if (filename != '') {
            suffix = get_suffix(filename)
            calculate_object_name(filename)
          }
          new_multipart_params = {
            'Filename':  dirName+'/'+ '${filename}',
            'key' : g_object_name,
            'policy': policyBase64,
            'title': title,
            'OSSAccessKeyId': accessid,
            'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
            'callback': callbackBody,
            'signature': signature,
          };

          up.setOption({
            'url': host,
            'multipart_params': new_multipart_params
          });

          up.start();
        }

        var uploader = new plupload.Uploader({
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
              document.getElementById('postfiles').onclick = function() {
                set_upload_param(uploader, '', false);
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
              check_object_radio();
              get_dirname();
              set_upload_param(up, file.name, true);
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
                document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = 'upload to oss success, object name:' + get_uploaded_object_name(file.name);
              }
              else
              {
                document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
              }
            },

            Error: function(up, err) {
              document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
            }
          }
        });
        uploader.init();
      });

    }
  }
</script>

<style>

  .btn{
    color: #fff;
    background-color: #337ab7;
    border-color: #2e6da4;
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    text-decoration: none;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
  }
  a.btn:hover{
    background-color: #3366b7;
  }
  .progress{
    margin-top:2px;
    width: 200px;
    height: 14px;
    margin-bottom: 10px;
    overflow: hidden;
    background-color: #f5f5f5;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,.1);
    box-shadow: inset 0 1px 2px rgba(0,0,0,.1);
  }
  .progress-bar{
    background-color: rgb(92, 184, 92);
    background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.14902) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.14902) 50%, rgba(255, 255, 255, 0.14902) 75%, transparent 75%, transparent);
    background-size: 40px 40px;
    box-shadow: rgba(0, 0, 0, 0.14902) 0px -1px 0px 0px inset;
    box-sizing: border-box;
    color: rgb(255, 255, 255);
    display: block;
    float: left;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    transition-delay: 0s;
    transition-duration: 0.6s;
    transition-property: width;
    transition-timing-function: ease;
    width: 266.188px;
  }
</style>

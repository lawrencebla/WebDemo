/*TMODJS:{"version":3,"md5":"74dc94311962dd9098d9b05f144d1a03"}*/
template('tpl_comment',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,info=$data.info,i=$data.i,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';$out+='<div> <div> <div>水木迷城真人实景游戏</div> <div>密室预约</div> <ul> <li><span class="phone-icon"></span>电话: </li> <li><span class="mobile-icon"></span>手机: </li> <li><span class="address-icon"></span>北京市还定去北三环西路科技会展中心</li> </ul> <div></div> </div> <div> <div>评论区</div> <ul class="j-post-comment-list-wrapper"> ';

            if(info && info.length > 0) {
                for(var i = 0; i < info.length ; i++) {
                    include("./tpl_comment_list_item", info[i]);
                }
            }
            
$out+=' </ul> <textarea class="j-post-comment-content"></textarea> <a class="j-post-comment" href="javascript:void(0)">评论</a> </div> </div>';
return new String($out);
});
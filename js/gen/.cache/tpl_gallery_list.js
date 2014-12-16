/*TMODJS:{"version":3,"md5":"e903b9e0bfa3e42126a79ba9600b4cdb"}*/
template('tpl_gallery_list',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,info=$data.info,i=$data.i,e=$data.e,$escape=$utils.$escape,$out='';
if(info && info.length) {
    for(var i = 0; i < info.length; i++) {
        var e = info[i];

$out+=' <li data-src="';
$out+=$escape(e.largeImgPath);
$out+='"> <a href="javascript:void(0)" data-id="';
$out+=$escape(e.id);
$out+='"> <img src="';
$out+=$escape(e.smallImgPath);
$out+='"/> <span>';
$out+=$escape(e.name);
$out+='</span> </a> </li> ';

    }
}

return new String($out);
});
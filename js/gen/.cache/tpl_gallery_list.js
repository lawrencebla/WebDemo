/*TMODJS:{"version":6,"md5":"10a6223a3624a2975c32dce04e5fb526"}*/
template('tpl_gallery_list',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,info=$data.info,i=$data.i,e=$data.e,$escape=$utils.$escape,$out='';
if(info && info.length) {
    for(var i = 0; i < info.length; i++) {
        var e = info[i];
        if(e.commonwealDone === false) {
            e.attach = "(逐梦中)";
        }

$out+=' <li data-src="';
$out+=$escape(e.largeImgPath);
$out+='" data-name="';
$out+=$escape(e.name);
$out+='" data-level="';
$out+=$escape(e.level);
$out+='" data-plot="';
$out+=$escape(e.plot);
$out+='" data-interest="';
$out+=$escape(e.interest);
$out+='" data-content="';
$out+=$escape(e.content);
$out+='" data-commonweal-done="';
$out+=$escape(e.commonwealDone);
$out+='"> <a href="javascript:void(0)" data-id="';
$out+=$escape(e.id);
$out+='"> <img src="';
$out+=$escape(e.smallImgPath);
$out+='"/> <span> ';
$out+=$escape(e.name);
$out+=$escape(e.attach);
$out+=' </span> </a> </li> ';

    }
}

return new String($out);
});
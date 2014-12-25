/*TMODJS:{"version":1,"md5":"99ec9b808fd8a3459ef247fce66f4264"}*/
template('tpl_popup_acticle',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,picturePath=$data.picturePath,name=$data.name,attach=$data.attach,content=$data.content,$out='';$out+='<div> <div><img src="';
$out+=$escape(picturePath);
$out+='"/></div> <div> <div>';
$out+=$escape(name);
$out+=$escape(attach);
$out+=':</div> <div>';
$out+=$escape(content);
$out+='</div> </div> </div>';
return new String($out);
});
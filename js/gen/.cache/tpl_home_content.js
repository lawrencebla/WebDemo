/*TMODJS:{"version":1,"md5":"b209282559f89c674b76065b83f77c70"}*/
template('tpl_home_content',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,i=$data.i,info=$data.info,e=$data.e,$escape=$utils.$escape,$out='';$out+='<div> ';

    for( var i = 0; i < info.length; i++) {
        var e = info[i];
    
$out+=' <li> <div>';
$out+=$escape(e.name);
$out+='</div> </li> ';
 } 
$out+=' </div>';
return new String($out);
});
/*TMODJS:{"version":2,"md5":"f4a6ceb68ee7951dfaea30a3b3ae2d61"}*/
template('tpl_home_content',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,i=$data.i,info=$data.info,e=$data.e,$escape=$utils.$escape,$out='';$out+='<div class="home-bg overlay"> <div class="fg_overlay"></div> </div> <div id="j_home_content"> <ul id="test1"> ';

        for( var i = 0; i < info.length; i++) {
            var e = info[i];
        
$out+=' <li> <div>';
$out+=$escape(e.name);
$out+='</div> </li> ';
 } 
$out+=' </ul> <ul id="test2"> ';

        for( var i = 0; i < info.length; i++) {
        var e = info[i];
        
$out+=' <li> <div>';
$out+=$escape(e.name);
$out+='</div> </li> ';
 } 
$out+=' </ul> </div>';
return new String($out);
});
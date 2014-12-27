/*TMODJS:{"version":2,"md5":"6d94d3cef5f1876fde5fc3d9f136b1dc"}*/
template('tpl_comment_list_item',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,content=$data.content,date=$data.date,$out='';$out+='<li> <span>玩家：</span>';
$out+=$escape(content);
$out+=' <span>';
$out+=$escape(date);
$out+='</span> </li>';
return new String($out);
});
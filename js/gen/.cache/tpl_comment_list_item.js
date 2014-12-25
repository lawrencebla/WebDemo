/*TMODJS:{"version":1,"md5":"00fbfbfe23956b912f075ba860e17f30"}*/
template('tpl_comment_list_item',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,content=$data.content,date=$data.date,$out='';$out+='<li> <span>玩家：</span>';
$out+=$escape(content);
$out+=' <span>';
$out+=$escape(date);
$out+='</span> </li>';
return new String($out);
});
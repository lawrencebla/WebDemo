/*TMODJS:{"version":2,"md5":"b6e21f7613fc478ad4d26bfc68a9088a"}*/
template('tpl_popup_book',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,picturePath=$data.picturePath,name=$data.name,level=$data.level,plot=$data.plot,interest=$data.interest,content=$data.content,$out='';$out+='<div> <div><img src="';
$out+=$escape(picturePath);
$out+='"/></div> <div> <div>';
$out+=$escape(name);
$out+='</div> <div>难度: ';
$out+=$escape(level);
$out+='</div> <div>情节: ';
$out+=$escape(plot);
$out+='</div> <div>趣味: ';
$out+=$escape(interest);
$out+='</div> <div>主题介绍</div> <div>';
$out+=$escape(content);
$out+='</div> </div> </div>';
return new String($out);
});
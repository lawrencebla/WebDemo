/*TMODJS:{"version":5,"md5":"f03a5909401852a8d923b1e23078284c"}*/
template('tpl_gallery_wrapper',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,galleryClass=$data.galleryClass,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},info=$data.info,$out='';$out+='<ul class="j-gallery-wrapper gallery lb-album ';
$out+=$escape(galleryClass);
$out+='"> ';

        include("./tpl_gallery_list", {info: info});
    
$out+=' </ul>';
return new String($out);
});
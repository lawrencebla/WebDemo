/*TMODJS:{"version":4,"md5":"72a604263b1af208b8cd4a845a1b3305"}*/
template('tpl_gallery_wrapper',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,galleryClass=$data.galleryClass,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},info=$data.info,$out='';$out+='<ul class="j-gallery-wrapper gallery lb-album ';
$out+=$escape(galleryClass);
$out+='"> ';

        include("./tpl_gallery_list", {info: info});
    
$out+=' </ul>';
return new String($out);
});
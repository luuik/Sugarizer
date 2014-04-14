define(function (require) {
    var activity = require("sugar-web/activity/activity");
    require(['domReady!'], function (doc) {
        activity.setup();
	    sourceElement = document.getElementById("source-text");
	    console.log(sourceElement);
	    var pressCb = function (ev) {
	       if (ev.charCode == 13) {
	         console.log(sourceElement.value);
	         var xhr = new XMLHttpRequest();

	         xhr.open('POST', 'http://localhost:8080/RPC2', false);

 			 xhr.onreadystatechange=function() {
		 	    if (xhr.readyState==4 && xhr.status==200) {
		 	       var responseStr = xhr.responseText;
		    	   console.log(responseStr);
		    	   var startPos = responseStr.indexOf("<member><name>text</name>");
		    	   startPos += 42;
		    	   var endPos = responseStr.indexOf("</string>", startPos);
				   var targetStr = responseStr.substring(startPos, endPos);
		    	   console.log("startPos=" + startPos +  " endPos=" + endPos + " targetStr=" + targetStr);

                   targetElement = document.getElementById("target-text");
		 	       targetElement.value = targetStr;
		 	       
 				   //document.getElementById("translation-text").innerHTML=xhr.responseText;
    			}
 			}
 			
 			var sendStr = "<?xml version='1.0'?><methodCall><methodName>translate</methodName>"
					+ "<params><param><value><struct><member><name>text</name>"
					+ "<value><string>" + sourceElement.value + "</string></value>"
					+ "</member><member><name>align</name><value><string>true</string></value>"
					+ "</member><member><name>report-all-factors</name><value><string>true</string></value>"
					+ "</member></struct></value></param></params></methodCall>";

	        xhr.send(sendStr);
	    }
	    }
	    sourceElement.addEventListener("keypress", pressCb, false);
    });

});

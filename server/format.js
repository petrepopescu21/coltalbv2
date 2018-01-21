module.exports = {
    formatArray: function(array) {
                let output = ""
                array.forEach((item)=>{
                    if(item.type == "paragraph") {
                        output = output + "<p>" + item.text + "</p>"
                    }
                    if(item.type == "heading4") {
                        output = output + "<h4>" + item.text + "</h4>"
                    }
                    if(item.type == "heading3") {
                        output = output + "<h3>" + item.text + "</h3>"
                    }
                    if(item.type == "image") {
                        output = output + "<img src='" + item.url + "'>"
                    }
                    if(item.type == "") {}
                })
                return output
            }
}
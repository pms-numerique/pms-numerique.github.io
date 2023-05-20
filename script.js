fetch("data/data.json")
.then(response => response.json())
.then(response => main(JSON.stringify(response)))
.catch(error => alert("Erreur : " + error));

async function main(res_json){
    index_part = JSON.parse(res_json);

    
}

function search(value1, value2) {
    String.prototype.sansAccent = function(){
        var accent = [
            /[\300-\306]/g, /[\340-\346]/g, // A, a
            /[\310-\313]/g, /[\350-\353]/g, // E, e
            /[\314-\317]/g, /[\354-\357]/g, // I, i
            /[\322-\330]/g, /[\362-\370]/g, // O, o
            /[\331-\334]/g, /[\371-\374]/g, // U, u
            /[\321]/g, /[\361]/g, // N, n
            /[\307]/g, /[\347]/g, // C, c
        ];
        var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];
         
        var str = this;
        for(var i = 0; i < accent.length; i++){
            str = str.replace(accent[i], noaccent[i]);
        }
         
        return str;
    }
    response_item = [];
    response_url = [];
    response_best_item = [];
    response_best_url = [];
    value1_ = value1.replace(/ /g,'');
    value1_ = value1_.toLowerCase();
    value1_ = value1_.sansAccent();
    value2_ = value2.replace(/ /g,'');
    value2_ = value2_.toLowerCase();
    value2_ = value2_.sansAccent();
    index_part.forEach(function(item, index, array) {
        item_ = item.Nom.replace(/ /g,'');
        item_ = item_.toLowerCase();
        item_ = item_.sansAccent();
        if(item.Type == "application\/pdf") {
        if(item_.includes(value1_)) {
            if(value1_ != ""){
            response_item.push(item.Nom);
            response_url.push(item.URL);
            }
        }
        if(item_.includes(value2_)) {
            if(value2_ != ""){
            response_item.push(item.Nom);
            response_url.push(item.URL);
            }
        }
        if(item_.includes(value1_)) {
            if(item_.includes(value2_)) {
                if(value1_ != ""){
                    if(value2_ != "") {
                    response_best_item.push(item.Nom);
                    response_best_url.push(item.URL);
                    }
                }
            }
        }
    }
    }
    )
    search_finished(response_item, response_url);
    if(response_best_item[0] != undefined) {
        best_finished(response_best_item, response_best_url);

    }
}
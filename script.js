fetch("data.json")
.then(response => response.json())
.then(response => main(JSON.stringify(response)))
.catch(error => alert("Erreur : " + error));

async function main(res_json){
    index_part = JSON.parse(res_json);

    
}

function search(titre, compositeur, instrument_out) {
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
    function getInstrument_en(_instrument) {
        if(_instrument == "violon") {
            return "violin";
        }
        if(_instrument == "alto") {
            return "viola";
        }
        if(_instrument == "violoncelle") {
            return "cello";
        }
        if(_instrument == "piano") {
            return "piano";
        }
        if(_instrument == "contrebasse") {
            return "doublebass";
        }
        if(_instrument == "flute") {
            return "flute";
        }
        if(_instrument == "clarinette") {
            return "clarinet";
        }
        if(_instrument == "hautbois") {
            return "oboe";
        }
        if(_instrument == "basson") {
            return "bassoon";
        }
        if(_instrument == "piccolo") {
            return "piccolo";
        }
        if(_instrument == "trompette") {
            return "trumpet";
        }
        if(_instrument == "cor") {
            return "horn";
        }
        if(_instrument == "trombone") {
            return "trombone";
        }
        if(_instrument == "tuba") {
            return "tuba";
        }
        if(_instrument == "saxophone") {
            return "saxophone";
        }
        if(_instrument == "batterie") {
            return "drums";
        }
        if(_instrument == "harpe") {
            return "harp";
        }
        if(_instrument == "guitare") {
            return "guitar";
        }
        
    }


    response_item = [];
    response_url = [];
    response_score = [];
    response_best_item = [];
    response_best_url = [];
    response_good_item = [];
    response_good_url = [];
    response_best_score = [];
    score = 0;
    titre_ = titre.replace(/ /g,'');
    titre_ = titre_.toLowerCase();
    titre_ = titre_.sansAccent();
    compositeur_ = compositeur.replace(/ /g,'');
    compositeur_ = compositeur_.toLowerCase();
    compositeur_ = compositeur_.sansAccent();
    if(instrument != ""){
    instrument_ = instrument_out.replace(/ /g,'');
    instrument_ = instrument_.toLowerCase();
    instrument_ = instrument_.sansAccent();
    instrument_en = getInstrument_en(instrument_);
    }
    
    index_part.forEach(function(item, index, array) {
        score = 0;
        item_ = item.Nom.replace(/ /g,'');
        item_ = item_.toLowerCase();
        item_ = item_.sansAccent();
        if(item.Type == "application\/pdf") {
        if(item_.includes(titre_)) {
            if(titre_ != ""){
            score = score + 1;
            response_item.push(item.Nom);
            response_url.push(item.URL);
            response_score.push(score);
            if(response_good_item.includes(item.Nom))
            {
                console.log("doublon détecté");
            }
            else {
                console.log("good accepté");
                response_good_item.push(item.Nom);
                response_good_url.push(item.URL);
            }
            }
        }
        if(item_.includes(compositeur_)) {
            if(compositeur_ != ""){
            score = score + 1;
            response_item.push(item.Nom);
            response_url.push(item.URL);
            response_score.push(score);
            if(response_good_item.includes(item.Nom))
            {
                console.log("doublon détecté");
            }
            else {
                console.log("good accepté");
                response_good_item.push(item.Nom);
                response_good_url.push(item.URL);
            }
            }
        }
    
        if(instrument_ != ""){
        if(item_.includes(instrument_)) {
            score = score + 1;
            response_item.push(item.Nom);
            response_url.push(item.URL);
            response_score.push(score);
        }
        else{
            if(item_.includes(instrument_en)){
                score = score + 1;
                response_item.push(item.Nom);
                response_url.push(item.URL);
                response_score.push(score);
            }
        }
    }
    }
    }
    )
    response_best_score.push("starting");
    response_score.forEach(function(item, index, array) {
        item_ = item
        index_ = index
        if(parseInt(item_, 10) > 1){
            if(response_best_item.includes(response_item[index_])) {console.log("procédure best refusé")}
            else {
            console.log("procédure best acceptée")
            response_best_score.forEach(function(item, index, array) {
                if(parseInt(item_, 10) > parseInt(item, 10)){
                    response_best_item.splice(index, 1);
                    response_best_url.splice(index, 1);
                    response_best_score.splice(index, 1);
                    response_best_item.push(response_item[index_]);
                    response_best_url.push(response_url[index_]);
                    response_best_score.push(item_);
                }
                if(parseInt(item_, 10) == parseInt(item, 10)){
                    if(response_item[index_] != response_best_item[index]){
                    response_best_item.push(response_item[index_]);
                    response_best_url.push(response_url[index_]);
                    response_best_score.push(item_);
                    }
                }
                if(response_best_score[0] == "starting"){
                    console.log("starting");
                    response_best_score.splice(0, 1);
                    response_best_item.push(response_item[index_]);
                    response_best_url.push(response_url[index_]);
                    response_best_score.push(item_);
                }
            })}
        }
    })
        
    search_finished(response_good_item, response_good_url);
    best_finished(response_best_item, response_best_url);
}

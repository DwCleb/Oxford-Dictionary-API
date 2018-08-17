const express = require('express');
const njk = require('nunjucks');
const path = require('path');

const Dictionary = require("oxford-dictionary-api");
const app_id = "5ac29bca";
const app_key = "cb0730c8aa92267b8e3af2630ec5d445";
const dict = new Dictionary(app_id, app_key);

const app = express();


njk.configure('views', {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));

app.get('/:word', (req, res) => {
  const word = req.params.word;
  
  dict.find(word,
  function(error,data) {
     if(error) return console.log('Erro: ' + error); 
     
    //console.log(data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]);
    const definition = data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
    //console.log();
    //console.log(data.results[0].lexicalEntries[0].entries[0].senses[0].subsenses[0].examples[0].text);
    const examples = data.results[0].lexicalEntries[0].entries[0].senses[0].subsenses[0].examples;

    res.render('index', { definition: definition, examples: examples });
  });
  
});

app.listen(3000);
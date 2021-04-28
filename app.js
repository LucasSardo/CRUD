//ESSA É A PARTE QUE TRABALHA NO LADO DO SERVIDOR (BACK-END)
const express = require('express');
//const bodyParser = require('body-Parser');
const mysql = require('mysql');
const hdbars = require('express-handlebars');
const app = express();
const urlencodedParser = express.urlencoded({extended:false});




const sql = mysql.createConnection({
    host: 'us-cdbr-east-03.cleardb.com',
    user: 'b6e3a65e4c4ff2',
    password: 'aeb5002e',
    port: 3306,
});
sql.query('USE heroku_78997774829e826')

//TEMPLATE ENGINE
app.engine('handlebars',hdbars  ({defaultLayout:'Main'}));
app.set('view engine','handlebars');

//LIBERANDO ARQUIVOS ESTÁTICOS
app.use('/css',express.static('css'));
app.use('/js',express.static('js'));
app.use('/img',express.static('img'));

        //LIBERANDO OS ARQUIVOS ESTÁTICOS ATRAVÉS DO MÉTODO DE ROTAS.
        //app.get('javascript', (req, res) =>{
        //    res.sendFile(__dirname + '/js/javascript.js')
        //})


//ROTAS E TEMPLATES
    // ROTA DO BARRA
app.get("/", (req, res) =>{ 
    //res.send('ROTA DO BasasARRA'); 
    //res.sendFile(__dirname+'/index.html')
    res.render('index', {id: req.params.id});

}) 

    //ROTA Q LEVA PARA A PÁGINA DE INSERÇÃO DE REGISTRO
app.get("/inserir",(req, res)=>{ //quando eu entro na pagina /inserir ele executa isso
    res.render('inserir');
})

//ROTA CHAMADA PELA PÁGINA INSERIR(CONTROLLERFORM) QDO CLICO NO BOTAO ADD
app.post("/controllerForm",urlencodedParser,(req, res)=>{ 
    sql.query("INSERT INTO user VALUES (?,?,?)",[req.body.id,req.body.NOME,req.body.IDADE]);
    res.render('controllerForm',{Nome:req.body.NOME})
})



app.get('/select/:id?',(req, res)=>{

    if(!req.params.id){ 
          sql.query('SELECT * FROM user', (err,resultado,campos)=>{
          res.render('select',{dados:resultado});
        } 
    )} else {
    sql.query('SELECT * FROM user WHERE ID=?',[req.params.id], (err,resultado,campos)=>{
        res.render('select',{dados:resultado});
            }
        )
    }
})


app.get('/deletar/:id' ,(req, res)=>{
    sql.query('DELETE FROM user WHERE ID=?',[req.params.id]);
    res.render('deletar')
})

app.get('/update/:ID', (req,res) =>{
    sql.query('SELECT * FROM user WHERE ID=?',[req.params.ID],function(err,results,campos){
    res.render('update',{ID:req.params.ID, NOME:results[0].NOME, IDADE:results[0].IDADE});
 
    })
})





//app.post("/controllerUpd",urlencodedParser, (req, res)=>{
//controler.log("passou")
//    sql.query('UPDATE user SET NOME=?, IDADE=? WHERE ID=?',[req.body.NOME, req.body.IDADE,req.body.ID]);
//    res.render('controllerUpd')
//})

app.post('/controllerUpd',urlencodedParser,function(req,res){
    
    sql.query('UPDATE user SET NOME=?, IDADE=? WHERE ID=?',[req.body.NOME, req.body.IDADE,req.body.ID])
    res.render('controllerUpd')
})

//INICIAR O SERVIDOR
//app.listen(process.env.PORT || 3000);

app.listen(process.env.port || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });



//Import the base generator module
var path = require('path');
var gens = require('yeoman-generator');

//Extend the base generator
module.exports = gens.Base.extend({
    
    constructor: function () {
        
        //Call the super constructor
        gens.Base.apply(this, arguments);
                
        //Arguments
        this.argument('appname', { type: String, required: true });
        this.appname = this._.camelize(this.appname);        
        
        this.host = "localhost";
        this.bucket = "default";
        this.password = "";
    
    },
    
    info : function () {        
        
        //Print some info
        console.log("== This is the Couchbase CEAN generator ==");
        console.log("appname = " + this.appname);
    },
    
    askForHost : function () {
        
        var done = this.async();
        this.prompt({
                type    : 'input',
                name    : 'host',
                message : 'Your Couchbase Host',
                default : this.host
        }, function (answers) {
            this.log(answers.host);
            this.host = answers.host;
            done();
        }.bind(this));
    },
    
    askForBucket : function () {
        
        var done = this.async();
        this.prompt({
                type    : 'input',
                name    : 'bucket',
                message : 'Your Couchbase Bucket',
                default : this.bucket
        }, function (answers) {
            this.log(answers.bucket);
            this.bucket = answers.bucket;
            done();
        }.bind(this));
    },
    
    askForPassword : function () {
        
        var done = this.async();
        this.prompt({
                type    : 'input',
                name    : 'password',
                message : 'Your Couchbase Bucket Password',
                default : this.password
        }, function (answers) {
            this.log(answers.password);
            this.password = answers.password;
            done();
        }.bind(this));
    },
    
    baseapp : function () {
      
        this.template('_bower.json', 'bower.json');
        this.template('_package.json', 'package.json');
    },
    
    serverapp : function () {
      
        this.template('server/_app.js', 'app.js');
    },
    
    clientapp : function () {
                     
        //Create the project directory structure
        this.mkdir('app');
        this.mkdir('app/images');
        this.mkdir('app/scripts');
        this.mkdir('app/scripts/controllers');
        this.mkdir('app/scripts/services');
        this.mkdir('app/styles');
        this.mkdir('app/views');
        
        //Copy files
        this.copy('client/_404.html', 'app/404.html');
        this.copy('client/_favicon.ico', 'app/favicon.ico');
        this.copy('client/_robots.txt', 'app/robots.txt');
        this.copy('client/images/_cb.png', 'app/images/cb.png');
        this.copy('client/images/_yeoman.png', 'app/images/yeoman.png');
        this.copy('client/styles/_main.css', 'app/styles/main.css');
            
        
        //Apply templates        
        this.template('client/_index.html', 'app/index.html');
        this.template('client/scripts/_app.js', 'app/scripts/app.js');
        this.template('client/scripts/controllers/_main.js', 'app/scripts/controllers/main.js');
        this.template('client/scripts/controllers/_mycontroller.js', 'app/scripts/controllers/mycontroller.js');
        this.template('client/scripts/services/_main.js', 'app/scripts/services/main.js');
        this.template('client/scripts/services/_myservice.js', 'app/scripts/services/myservice.js');
        this.template('client/views/_footer.html', 'app/views/footer.html');
        this.template('client/views/_header.html', 'app/views/header.html');
        this.template('client/views/_main.html', 'app/views/main.html');    
    },

    installDeps : function() {
        
        this.installDependencies();
        
    }
});
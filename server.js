const express = require('express');
const hbs = require('hbs');
 const fs =require('fs');
const PORT = process.env.PORT || 3000;


//staring a server, binding it to a local machine 
 
//making a new express app below
var app = express();

hbs.registerPartials(__dirname + '/views/partials');



app.set('view engine','hbs');

app.use(express.static(__dirname + '/public'));//creating a middleware ..dirname stores the path to your project directory
// express.static( ) function takesup the absolute path we want to serve  
// aap.use() is how you use middleware
app.use((req,res,next) =>{
	var now = new Date().toString();
	// console.log(`${now}: ${req.method} ${req.url}` )
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n' ,(err) =>{
		if(err){
			console.log('unable to append to log file');
		}
	});
	// console.log(now);
	next();
});

// app.use((req,res,next) =>{
// res.render('maintenance.hbs');

// });
 





 hbs.registerHelper('getCurrentYear', () =>{
 	return new Date().getFullYear()
 });

hbs.registerHelper('screamIt', (text) =>{
	return text.toUpperCase();
}); 





//staring setting up http route handler ,registering a handler below to handle a http request.
app.get('/', (req,res) =>{
  // res.send('<h1>hello express</h1>');
// res.send({
// 	name: 'andi',
// 	likes: ['biking']
// }); 

 res.render('home.hbs', {

	pageTitle: 'Home Page',
   
	welcomeMessage: 'welcome to my website.',
	// currentYear: new Date().getFullYear()
});
});

app.get('/about',(req,res) =>{
	//res.send('About Page');res.render will let us render anytemplate we have set up
	res.render('about.hbs', {
		pageTitle: 'About Page',
		// currentYear: new Date().getFullYear()
	});  
});
 
 app.get('/project',(req,res) =>{
	//res.send('About Page');res.render will let us render anytemplate we have set up
	res.render('project.hbs', {
		pageTitle: 'ProjectPage'
		// currentYear: new Date().getFullYear()
	});  
});

app.get('/bad', (req,res) =>{
	res.send({
		errorMessage: "unable to handle request"
	});
});





//for app to listen,this will bind the port to machine

app.listen(PORT,() =>
	{
		console.log(`server is up on  ${PORT}`);
	});

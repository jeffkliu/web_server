const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));
app.use((req, res, next)=>{
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err){
			console.log('Unable to append to server.log.')
		}
	});
	next();
});

// app.use((req,res,next)=>{
// 	res.render('maintenance.hbs', {
// 		pageTitle: 'Maintenance page',
// 		welcomeMessage: 'There\'s an error in this page!!'
// 	})
// });


hbs.registerHelper('getCurrentYear', ()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
	return text.toUpperCase();
});

app.get('/', (request, response)=>{
	// response.send('<h1>Hello Express!</h1>');
	response.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to Jeff\'s node testing'
	})
});

app.get('/about',(req, res)=>{
	res.render('about.hbs', {
		pageTitle: 'About page'
	});
});

app.get('/bad', (req, res)=>{
	res.send({
		errorMessage: 'Bad response'
	})
})

app.get('/schedule',(req,res)=>{
	res.render('schedule.hbs', {
		pageTitle: 'Schedules',
		welcomeMessage: 'Welcome to my schedules'
	});
});


app.listen(port, ()=>{
	console.log(`Server is up on port ${port}`)
});
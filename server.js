const express = require('express');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next)=>{

});

hbs.registerHelper('getCurrentYear', ()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
	return text.toUpperCase();
})

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

app.listen(3000, ()=>{
	console.log('Server is up on port 3000')
});
const express = require('express');
const cors = require('cors');
const db = require('./models');
const app = express();

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to the Database!');
}).catch(err => {
    console.log('Cannot connect to the Database!', err);
    process.exit();
});

var corsOptions = {
	origin: '*'
  };

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

require('./routes/user.route')(app);
//require('./routes/user.route')

app.get('/verify/:token', (req, res)=>{
	const {token} = req.params;

	// Verifying the JWT token
	jwt.verify(token, 'ourSecretKey', function(err, decoded) {
		if (err) {
			console.log(err);
			res.send("Email verification failed,possibly the link is invalid or expired");
		}
		else {
			res.send("Email verifified successfully");
		}
	});
});
require('./routes/product.routes')(app);


const PORT = 3033;

app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`);
})

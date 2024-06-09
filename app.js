const dialogflow = require('@google-cloud/dialogflow');
const { WebhookClient, Suggestion } = require('dialogflow-fulfillment');
const express = require("express")
const cors = require("cors");
const nodemailer = require('nodemailer')

const app = express();
app.use(express.json())
app.use(cors());
const PORT = 3002;



app.get('/', (req, res) => {
    res.send('Hello Dialogflow!')
})

app.post("/webhook", async (req, res) => {
    var id = (res.req.body.session).substr(43);
    console.log(id)
    const agent = new WebhookClient({ request: req, response: res });

    function welcome(agent) {
        console.log(`intent  => Welcome `);
        agent.add("Hi from the server")
    }
    

    function fallback(agent) {
        console.log(`intent => Fallback `)
        agent.add("Fallback from the server")
        
        function Collectdata(agent){
            const { person, phonenumber, email, address, gender, qualification, Dateofbirth, geocity } = agent.parameters;
            console.log(`intent => Collectdata`);
        }
        
       const accountSid = `AC92a9edf66e5772b78601d0a060beda57`;
       const authToken = `5c81c6f815aaee25f58b16f00b822ea6`;
       const client = require('twilio')(accountSid, authToken);

        agent.add(
            `Email has sent to the user.`
        )
        //client.messages
            .create({
                body: `Hi there, We received your email with your name ${person.name}  with your phone number ${phone} with your email address ${email} and your address ${address} with your gender ${gender} with your qualification ${qualification} with your date of birth ${Dateofbirth} with your geocity${geocity}. Thank You for your email\.`,
                from: '+12762548738',
                to: '+923238915443'
            })
            .then(message => console.log(message.sid));

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'salmanjavaid76@@gmail.com',
                pass: 'kzalicuixqrutztn'
            }
            = {
                from: 'salmanjavaid76@gmail.com',
                to: 'hammadn788@gmail.com',  
                subject: 'Saylani Student Information',
                html: `
                    <div style="text-align: center; font-size: 18px; color: black;">
                        <p>Hi ${person},</p>
                        <p>Thank you for contacting Saylani Welfare Trust.</p>
                        <h1 style="font-size: 24px; color: blue; text-align: center;">Saylani Student Information</h1>
                        <div style="background-color: skyblue; padding: 20px; border-radius: 10px; display: inline-block;">
                            <p style="margin: 10px 0;">Name: ${person}</p>
                            <p style="margin: 10px 0;">Email: ${email}</p>
                            <p style="margin: 10px 0;">Phone: ${phone}</p>
                            <p style="margin: 10px 0;">City: ${city}</p>
                            <p style="margin: 10px 0;">Date of birth: ${Dateofbirth}</p>
                            <p style="margin: 10px 0;">Gender: ${Gender}</p>
                            <p style="margin: 10px 0;">Address: ${address}</p>
                            <p style="margin: 10px 0;">Qualification: ${Qualification}</p>
                        </div>
                        <p>Thank you for your email.</p>
                    </div>
                `
            }




        });

        var mailOptions = {
            from: 'salmanjavaid76@gmail.com',
            to: `hammadn788@gamil.com`,
            subject: 'Sending Email From Node JS Server',
            text: `Hi there, We received your email with your name ${person.name}  with your phone number ${phone} with your email address ${email} and your address ${address} with your gender ${gender} with your qualification ${qualification} with your date of birth ${Dateofbirth} with your geocity${geocity}.Thank You for your email.`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

    let intentMap = new Map();
    // intentMap.set('contact', contact);
    // intentMap.set('about', about);
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('Collectdata', Collectdata);

    agent.handleRequest(intentMap);
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
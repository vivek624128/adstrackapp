/**
 * Created by Flashbox on 6/30/2016.
 */
// const email = require("smpt-mail");

var sendmail = require('sendmail')();

function sendEMail(data, password) {

    /*const config = {
     smtpHost: 'smtp.programmervivek.co.in',
     smtpUser: 'info@programmervivek.co.in',
     smtpPass: 'info@123',
     from: 'info@programmervivek.co.in',
     to: [data.emailId],
     subject: 'Password for Mahaboudh Tracking App',
     htmlStr: 'Hello '+ data.username +', <br/>' +
     'You have successfully registered on Mahaboudhi Tracking App. For Login with following are the credentials : ' +
     '<br /> User Name : '+data.username+'<br/> Password : ' +password +'<br/>' +
     'Thanks & Regards <br/> Mahaboudhi Team',
     htmlContext: {
     user: {
     name: 'tsq'
     }
     }
     };*/

/*    console.log(data.emailId)
    const config = {
        smtpHost: 'unlimited.cms500.com',
        smtpUser: 'info@programmervivek.co.in',
        smtpPass: 'info@123',
        from: 'info@programmervivek.co.in',
        to: [data.emailId,],
        subject: 'Password for Mahaboudh Tracking App',
        htmlStr: 'Hello ' + data.username + ', <br/>' +
        'You have successfully registered on Mahaboudhi Tracking App. For Login with following are the credentials : ' +
        '<br /> User Name : ' + data.username + '<br/> Password : ' + password + '<br/><br/><br/>' +
        'Thanks & Regards <br/> Mahaboudhi Team',
        htmlContext: {
            user: {
                name: 'tsq'
            }
        }
    };

    email(config, function (err, result) {
        console.log(err, result);
    });*/
    sendmail({
     from: 'info@programmervivek.co.in',
     to: data.emailId,
     subject: 'Password for Mahaboudh Tracking App',
     html: 'Hello '+ data.username +', <br/>' +
     'You have successfully registered on Mahaboudhi Tracking App. For Login with following are the credentials : ' +
     '<br /> User Name : '+data.username+'<br/> Password : ' +password +'<br/>' +
     'Thanks & Regards <br/> Mahaboudhi Team'
     }, function(err, reply) {
     console.log(err && err.stack);
     console.dir(reply);
     });
}

module.exports = {
    sendMail: sendEMail
}

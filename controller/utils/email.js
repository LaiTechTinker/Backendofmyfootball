const nodmailer= require('nodemailer')

const sendemail=async(options)=>{
const transpoter=nodmailer.createTransport({
host:process.env.HOST,
port:process.env.EMAIL_PORT,
auth:{
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASSWORD
}

})
const emailoptions={
    from:'strakcomany@cineflix.com',
    to:options.email,
    subject:options.subject,
    text:options.message
}
await transpoter.sendMail(emailoptions);
}
module.exports=sendemail
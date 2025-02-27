const nodemailer=require('nodemailer')

exports.sendMail=(req,res)=>{
const transporter=nodemailer.createTransport({
    service:'gmail',
    host: 'smtp.gmail.com', // Replace with your SMTP host (e.g., 'smtp.gmail.com' for Gmail)
    port: 587, // Replace with the appropriate port (587 for TLS, 465 for SSL, etc.)
    secure: false, // Use true for port 465, false for other ports
    auth: {
      user: 'layiibrahim32@gmail.com', // Replace with your email
      pass: 'huys wbmv ysad vose', // Replace with your email password or app password
    },
})
const mailOptions={
    from: '"ibrahim" layiibrahim32@gmail.com', // Sender address
    to: req.body.email, // List of recipients (separate multiple emails with commas)
    subject: req.body.subject, // Subject line
    text: req.body.message// Plain text body
}
transporter.sendMail(mailOptions,(error,info)=>{
    if(error){
        console.log(error)
        res.status(500).json({
            status:'fail',
            message:error.message
        })
    }else{
res.status(200).json({
    status:'success',
    message:'email message successfully sent'
})
        console.log('email message successfully sent:',info.response)
    }
})
}
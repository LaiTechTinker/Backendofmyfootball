// this code is is created for global error for handling customerrors
class Customerr extends Error{
    constructor(message,statuscode){
        super(message)
  this.statuscode=statuscode;
  this.message=statuscode>=400&&500?'fail':'error';
  this.isOperation=true;
  Error.captureStackTrace(this,this.constructor) 
    }
}
module.exports=Customerr
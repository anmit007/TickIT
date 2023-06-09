import mongoose from "mongoose";


// interface that describes the properties that are required to create a new user

interface UserAttrs {
    email : string;
    password: string;
}

// interface that describes the properties that a user model has

interface UserModel extends mongoose.Model<UserDocument>{  
    build(attrs: UserAttrs): UserDocument;
 }

 //interface that describes the properties that a user document has

interface UserDocument extends mongoose.Document {
    email: string;
    password : string;
}


const userSchema = new mongoose.Schema({

    email :{ 
        type: String,
        required: true
    },
    password: {
        type: String,
        required : true
    }
});
userSchema.statics.build = (attrs: UserAttrs) =>
{
    return new User(attrs);
}

const User = mongoose.model<UserDocument,UserModel>('User',userSchema);

export{User};


 
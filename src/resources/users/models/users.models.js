import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

const SALT_WORK_FACTOR = 12
const userSchema = new mongoose.Schema( {
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    index: { unique: true }
  },
  password: {
    type: String,
    required: true
  }
} )

userSchema.pre( 'save', async function(next ){
  if ( !this.isModified( 'password' ) ) return next();
  try {
    const salt = await bcrypt.genSalt( SALT_WORK_FACTOR );
    this.password = await bcrypt.hash( this.password, salt );
    return next();

  } catch ( err ) {
    return next( err );
  }
} )

userSchema.methods.validatePassword = async function validatePassword( data ) {
  return bcrypt.compare( data, this.password );
};


export const UserModel = new mongoose.model( 'User', userSchema )

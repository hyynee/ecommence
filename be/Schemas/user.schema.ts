import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true, trim: true })
  @ApiProperty()
  name: string;

  @Prop({ 
    required: true, 
    unique: true, 
    trim: true, 
    match: [/.+\@.+\..+/, 'Email không hợp lệ'] 
  })
  @ApiProperty()
  email: string;

  @Prop({ 
    required: true, 
    minlength: [6, 'Mật khẩu phải có ít nhất 6 ký tự'], 
    validate: {
      validator: function (value: string) {
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value); 
      },
      message: 'Mật khẩu phải có ít nhất 1 chữ cái và 1 số'
    }
  })
  @ApiProperty()
  password: string;

  @Prop({ 
    enum: ['admin', 'customer'], 
    default: 'customer' 
  })
  role: string;
  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compareSync(password, this.password);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

// Hash password trước khi lưu
UserSchema.pre<User>('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};


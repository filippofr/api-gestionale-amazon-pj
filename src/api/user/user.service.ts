import * as bcrypt from 'bcrypt';
import { UserExistsError } from "../../errors/user-exists";
import { WrongPasswordError } from "../../errors/wrong-password";
import { UserIdentity as UserIdentityModel } from "../../utils/auth/local/user-identity.model";
import { User } from "./user.entity";
import { User as UserModel } from "./user.model";
import nodemailer from 'nodemailer';

export class UserService {

  async add(user: User, credentials: {username: string, password: string}): Promise<User> {
    const existingIdentity = await UserIdentityModel.findOne({'credentials.username': credentials.username});
    console.log('username: ' + credentials.username);
    if (existingIdentity) {
      throw new UserExistsError();
    }
    const hashedPassword = await bcrypt.hash(credentials.password, 10);
    
    const newUser = await UserModel.create(user);

    await UserIdentityModel.create({
      provider: 'local',
      user: newUser._id,
      credentials: {
        username: credentials.username,
        hashedPassword
      }
    })
    
    await this.sendEmail(credentials.username, 'token');

    return newUser;
  }

  async update(userId: string, newPassword: string, oldPassword: string){
    try {
      const identity = await UserIdentityModel.findOne({user: userId});
      
      console.log(identity!.toObject().user);

      const match = await bcrypt.compare(oldPassword, identity!.credentials.hashedPassword);

      if(!match) {
        throw new WrongPasswordError();
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      identity!.credentials.hashedPassword = hashedPassword;
      await identity!.save();
      
      const updatedUser = await UserIdentityModel.findOne({user: userId});

      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async sendEmail(email: string, token: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      auth: {
        user: 'noreply.pigiamawork@gmail.com',
        pass: 'phgptwxgsnudfpfq'
      }
    });

    const mailOptions = {
      from: 'noreply.pigiamawork@gmail.com',
      to: email,
      subject: 'Conferma la tua registrazione',
      text: `Grazie per esserti registrato! Per favore conferma la tua email cliccando sul link seguente... ${token}`
      // Potresti voler generare un link di conferma qui
    };

    return transporter.sendMail(mailOptions);
  }
  
}

export default new UserService();
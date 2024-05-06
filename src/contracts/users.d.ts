export interface AuthInputTyping {
    email: string;
    password: string;
    confirm_password?: string;
  }
  
    export interface ChangePasswordInputTyping {
      newPassword: string;
      newPasswordConfirmation: string
    }
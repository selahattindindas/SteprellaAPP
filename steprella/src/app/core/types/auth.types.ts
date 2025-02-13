export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN'
}

export interface UserPayload {
  phone: string;
  fullName: string;
  sub: string;
  role: UserRole | string;
  iat?: number;
  exp?: number;
}

export enum AuthErrorMessages {
  SESSION_NOT_FOUND = 'Oturum bulunamadı',
  INVALID_SESSION = 'Geçersiz oturum',
  PERMISSION_NOT_FOUND = 'Yetki bilgisi bulunamadı',
  INSUFFICIENT_PERMISSION = 'Bu işlem için yetkiniz bulunmuyor'
}

export interface AuthError {
  statusCode: number;
  message: AuthErrorMessages;
} 
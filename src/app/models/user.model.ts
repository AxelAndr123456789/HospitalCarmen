export interface User {
    id: number;
    username: string;
    email: string;
    role: 'admin' | 'doctor' | 'nurse' | 'patient';
    token?: string;
}

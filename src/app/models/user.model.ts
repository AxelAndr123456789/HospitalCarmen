export interface User {
    id: number;
    username: string;
    email: string;
    name?: string;
    role: 'admin' | 'doctor' | 'nurse' | 'patient' | 'fedatario';
    token?: string;
}

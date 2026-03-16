export class CreateUserDto {
	username: string;
	email: string;
	password: string;
	idRol: number;
	activo?: boolean;
}

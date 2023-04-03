export class Persona{
    private dni: Number;
    private nombre: String;
    private apellido: String;
    private fecha_nacimiento: Date;
    private sexo: String;

    
    constructor(dni:Number,nombre:String,apellido:String,fecha_nacimiento:Date,sexo:String){
        this.dni=dni;
        this.nombre=nombre;
        this.apellido=apellido;
        this.fecha_nacimiento=fecha_nacimiento;
        this.sexo=sexo;
    }

    //Getters

    public get getDni() {
        return this.dni;
    }

    public get getNombre() {
        return this.nombre;
    }

    public get getApellido() {
        return this.apellido;
    }

    public get getNacimiento() {
        return this.fecha_nacimiento;
    }

    public get getSexo() {
        return this.sexo;
    }

    //Setters

    public set setDni(dni:Number) {
        this.dni=dni;
    }

    public set setNombre(nombre:String) {
        this.nombre=nombre;
    }

    public set setApellido(apellido:String) {
        this.apellido=apellido;
    }

    public set setNacimiento(nacimiento:Date) {
        this.fecha_nacimiento=nacimiento;
    }

    public set setSexo(sexo:String) {
        this.sexo=sexo;
    }

}
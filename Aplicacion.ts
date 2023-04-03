export class Aplicacion{
    private fechaDeAplicacion: Date;
    private dniPaciente: Number;
    private vacunaAplicada: Number;
    private dosis:Number;
    
    constructor(fechaDeAplicacion:Date,dniPaciente:Number,vacunaAplicada:Number,dosis:Number){
        this.fechaDeAplicacion=fechaDeAplicacion;
        this.dniPaciente=dniPaciente;
        this.vacunaAplicada=vacunaAplicada;
        this.dosis=dosis;
    }

    //Getters

    public get getFechaDeAplicacion() {
        return this.fechaDeAplicacion;
    }

    public get getDniPaciente() {
        return this.dniPaciente;
    }

    public get getVacunaAplicada() {
        return this.vacunaAplicada;
    }

    public get getDosis() {
        return this.dosis;
    }

    //Setters

    public set setFechaDeAplicacion(fechaDeAplicacion:Date) {
        this.fechaDeAplicacion=fechaDeAplicacion;
    }

    public set setDniPaciente(dniPaciente:Number) {
        this.dniPaciente=dniPaciente;
    }

    public set setVacunaAplicada(vacunaAplicada:Number) {
        this.vacunaAplicada=vacunaAplicada;
    }

    public set setDosis(dosis:Number) {
        this.dosis=dosis;
    }

}
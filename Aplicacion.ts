export class Aplicacion{
    private fechaDeAplicacion: Date;
    private vacunaAplicada: Number;
    private dosis:Number;
    
    constructor(fechaDeAplicacion:Date,vacunaAplicada:Number,dosis:Number){
        this.fechaDeAplicacion=fechaDeAplicacion;
        this.vacunaAplicada=vacunaAplicada;
        this.dosis=dosis;
    }

    //Getters

    public get getFechaDeAplicacion() {
        return this.fechaDeAplicacion;
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

    public set setVacunaAplicada(vacunaAplicada:Number) {
        this.vacunaAplicada=vacunaAplicada;
    }

    public set setDosis(dosis:Number) {
        this.dosis=dosis;
    }

}


export class Aplicacion{
    private fechaDeAplicacion: Date;
    private vacunaAplicada: Number;
    private fabricante: String;
    private dosis:Number;
    
    constructor(fechaDeAplicacion:Date,vacunaAplicada:Number,dosis:Number,fabricante:String){
        this.fechaDeAplicacion=fechaDeAplicacion;
        this.vacunaAplicada=vacunaAplicada;
        this.fabricante=fabricante;
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

    public get getFabricante(){
        return this.fabricante
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

    public set setFabricante(fabricante:String){
        this.fabricante=fabricante
    }
}


export class Vacuna{
    private id: Number;
    private descripcion: String;
    private fabricante: String;
    private tipo: String;
    private dosisRequeridas: Number;

    
    constructor(id:Number,descripcion:String,fabricante:String,tipo:String,dosisRequeridas:Number){
        this.id=id;
        this.descripcion=descripcion;
        this.fabricante=fabricante;
        this.tipo=tipo;
        this.dosisRequeridas=dosisRequeridas;
    }

    public get getId() {
        return this.id;
    }

    public get getDescripcion() {
        return this.descripcion;
    }

    public get getFabricante() {
        return this.fabricante;
    }

    public get getTipo() {
        return this.tipo;
    }

    public get getDosisRequeridas() {
        return this.dosisRequeridas;
    }

    //Setters

    public set setId(id:Number) {
        this.id=id;
    }

    public set setDescripcion(descripcion:String) {
        this.descripcion=descripcion;
    }

    public set setFabricante(fabricante:String) {
        this.fabricante=fabricante;
    }

    public set setTipo(tipo:String) {
        this.tipo=tipo;
    }

    public set setDosisRequeridas(dosisRequeridas:String) {
        this.dosisRequeridas=this.dosisRequeridas;
    }

}
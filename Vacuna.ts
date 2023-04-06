export class Vacuna{
    private id: Number;
    private descripcion: String;
    private fabricantes: Array<String>;
    private tipo: String;
    private dosisRequeridas: Number;

    
    constructor(id:Number,descripcion:String,fabricantes:Array<String>,tipo:String,dosisRequeridas:Number){
        this.id=id;
        this.descripcion=descripcion;
        this.fabricantes=fabricantes;
        this.tipo=tipo;
        this.dosisRequeridas=dosisRequeridas;
    }

    public get getId() {
        return this.id;
    }

    public get getDescripcion() {
        return this.descripcion;
    }

    public get getFabricantes() {
        return this.fabricantes;
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

    public set setFabricantes(fabricantes:Array<String>) {
        this.fabricantes=fabricantes
    }
    public set setTipo(tipo:String) {
        this.tipo=tipo;
    }

    public set setDosisRequeridas(dosisRequeridas:Number) {
        this.dosisRequeridas=this.dosisRequeridas;
    }

}
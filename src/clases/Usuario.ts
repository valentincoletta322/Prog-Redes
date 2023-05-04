import { Aplicacion } from "./Aplicacion";

export class Usuario{
    private username: String;
    private password: String;
    
    constructor(username:String,password:String){
        this.username=username;
        this.password=password;
    }

    //Getters

    public get getUsername() {
        return this.username;
    }

    public get getPassword() {
        return this.password;
    }

    //Setters

    public set setUsuario(username:String) {
        this.username=username;
    }

    public set setPassword(password:String) {
        this.password=password;
    }
}
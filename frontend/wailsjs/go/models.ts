export namespace mongodb {
	
	export class Credentials {
	    Website: string;
	    Login: string;
	    Password: string;
	    Additional: string;
	
	    static createFrom(source: any = {}) {
	        return new Credentials(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Website = source["Website"];
	        this.Login = source["Login"];
	        this.Password = source["Password"];
	        this.Additional = source["Additional"];
	    }
	}
	export class User {
	    Login: string;
	    Password: string;
	
	    static createFrom(source: any = {}) {
	        return new User(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Login = source["Login"];
	        this.Password = source["Password"];
	    }
	}

}


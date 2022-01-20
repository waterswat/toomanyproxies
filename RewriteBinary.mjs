// for api compatibility

export class RewriteBinary {
	constructor(tomp){
		this.tomp = tomp;
	}
	wrap(code, url){
		return code;
	}
	unwrap(code, url){
		return code;
	}
	serve(serve, url){
		if(serve.startsWith('data:'))return serve;
		return this.tomp.url.wrap(serve, 'worker:binary');
	}
};
import messages from './Messages.mjs';

// WIP
export const protocols =     ['http:','https:'];
export const default_ports = [80     ,443     ];

export class ParsedRewrittenURL {
	toString(){
		return `${this.protocol}//${this.host}${this.path}`;
	}
};

export class RewriteURL {
	constructor(tomp){
		this.tomp = tomp;
	}
	// end of host is ]/
	wrap_parsed(url, service){
		const protoi = protocols.indexOf(url.protocol);
		const field = url.port.toString(16) + '/' + protoi.toString(16) + encodeURIComponent(url.path);
		return this.tomp.prefix + service + '/' + url.host + '/' + field;
	}
	wrap(url, service){
		const og = new URL(url);
		const protoi = protocols.indexOf(og.protocol);
		var port = parseInt(og.port);
		if(isNaN(port))port = default_ports[protoi];
		
		// android-app, ios-app, mailto, many other non-browser protocols
		if(protoi == -1)return url; // throw new RangeError(`Unsupported protocol '${og.protocol}'`);
		if(isNaN(port))throw new URIError(`Unknown default port for protocol: '${og.protocol}'`);

		const field = port.toString(16) + '/' + protoi.toString(16) + encodeURIComponent(og.href.slice(origin.length)) + og.hash;
		return this.tomp.prefix + service + '/' + og.host + '/' + field;
	}
	// only called in send.js get_data
	unwrap(query, field){
		const host = [];

		for(let part of query.slice(0,-1).split('/').reverse()){
			host.push(decodeURIComponent(part));
		}
		
		const porti = field.indexOf('/', 1);
		const port = parseInt(field.slice(1, porti), 16);
		if(porti == -1)throw new URIError('Bad URL');
		const protocol = protocols[parseInt(field[porti + 1], 16)];
		if(!protocol)throw new URIError('Bad URL');
		const path = decodeURIComponent(field.slice(porti + 2));
		
		return Object.setPrototypeOf({
			protocol,
			path,
			port,
			host: host.join('.'),
		}, ParsedRewrittenURL.prototype);
	}
	get_attributes(url){
		const path = url.slice(this.tomp.prefix.length);
		
		const si = path.indexOf('/', 1);
		
		/*if(si == -1 || qi == -1){
			throw { message: messages['error.badurl'] };
		}*/

		const result = {
			service: si == -1 ? path : path.slice(0, si),
			field: si == -1 ? '/' : path.slice(si),
		};

		console.log(result);
		
		return result
	}
};
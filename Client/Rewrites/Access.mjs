import { Rewrite } from '../Rewrite.mjs';
import { global } from '../../Global.mjs';
import { global_client } from '../../RewriteJS.mjs';

export class AccessRewrite extends Rewrite {
	get$m(obj, key) {
		if (!this.client.service_worker && global != global.top && obj == global.top) {
			return global.top[global_client].access.get$m(obj, key);
		}
		
		if (obj == global && key == 'location' || !this.client.service_worker && obj == global.document && key == 'location') {
			return this.client.location.proxy;
		}
		
		if (!this.client.service_worker && obj == global && key == 'top' && global != global.top) {
			return global.top;
		}
		
		return obj[key];
    }
    set$m(obj, key, val, operator) {
		if(!this.client.service_worker && global != global.top && obj == global.top){
			return global.top[global_client].access.set$m(global.top, key, val, operator);
		}

		if(obj == global && key == 'location' || !this.client.service_worker && obj == global.document && key == 'location'){
			obj = location;
			key = 'href';
		}

		switch(operator) {
			case '+=':
				return obj[key] += val;
			case '-=':
				return obj[key] -= val;
			case '*=':
				return obj[key] *= val;
			case '/=':
				return obj[key] /= val;
			case '%=':
				return obj[key] %= val;
			case '**=':
				return obj[key] **= val;
			case '<<=':
				return obj[key] <<= val;
			case '>>=':
				return obj[key] >>= val;
			case '>>>=':
				return obj[key] >>>= val;
			case '&=':
				return obj[key] &= val;
			case '^=':
				return obj[key] ^= val;
			case '|=':
				return obj[key] |= val;
			case '&&=':
				return obj[key] &&= val;
			case '||=':
				return obj[key] ||= val;
			case '??=':
				return obj[key] ??= val;
			case '++':
				return obj[key]++;
			case '--':
				return obj[key]--;
			case '=':
			default:
				return obj[key] = val;
		};
    }
    call$m(obj, key, args){
        if(!this.client.service_worker && global != global.top && obj == global.top){
			return this.top[global_client].access.call$m(global.top, key, args);
		}

		return obj[key](...args);
    }
    get$(obj){
		if(obj == this.client.location.global)return this.client.location.proxy;
		if(!this.client.service_worker && obj == global.top)return global.top;
        return obj;
    }
    set$(obj, val, operator){
        if(obj == this.client.location.global){
			obj = this.client.location.proxy;
			// return this.set$(this.client.location.proxy, val, operator);
		}
		
		if(!this.client.service_worker && global != global.top && obj == global.top){
			return global.top[global_client].access.set$(global.top, val, operator);
		}
		
		switch(operator){
			case '+=':
				return obj += val;
			case '-=':
				return obj -= val;
			case '*=':
				return obj *= val;
			case '/=':
				return obj /= val;
			case '%=':
				return obj %= val;
			case '**=':
				return obj **= val;
			case '<<=':
				return obj <<= val;
			case '>>=':
				return obj >>= val;
			case '>>>=':
				return obj >>>= val;
			case '&=':
				return obj &= val;
			case '^=':
				return obj ^= val;
			case '|=':
				return obj |= val;
			case '&&=':
				return obj &&= val;
			case '||=':
				return obj ||= val;
			case '??=':
				return obj ??= val;
			case '++':
				return obj++;
			case '--':
				return obj--;
			case '=':
			default:
				return obj = val;
		}
	}
};
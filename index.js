const comutl    = mofron.util.common;

/**
 * @file mofron-event-dev/index.js
 * @brief event module template for developper
 * @license MIT
 */
module.exports = class extends mofron.class.Event {
    /**
     * initialize event
     * 
     * @param (mixed) short-form parameter
     *                key-value: event config
     * @short
     * @type private
     */
    constructor (prm) {
        try {
            super();
            this.name("TextCheck");
	    //this.shortForm("");
            
            this.confmng().add("minLength", { type:'number' });
            this.confmng().add("maxLength", { type:'number' });
            this.confmng().add("letter", { type: 'boolean', init: true });
            this.confmng().add("number", { type: 'boolean', init: true });
            this.confmng().add("symbol", { type: 'string', list: true })
            
	    if (undefined !== prm) {
                this.config(prm);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    letter (prm) {
        try {
            return this.confmng('letter',prm);
	} catch (e) { 
            console.error(e.stack);
            throw e;
        }
    }

    number (prm) {
        try {
            return this.confmng('number',prm);
        } catch (e) { 
            console.error(e.stack);
            throw e;
        }
    }

    symbol (prm) {
        try {
            return this.confmng('symbol',prm);
	} catch (e) { 
            console.error(e.stack);
            throw e;
        }
    }
    
    valueCheck (p1,p2,p3) {
        try {
	    if ((null === p2) || ('' === p2)) {
                if (true === p1.required()) {
		    p3.execListener('REQUIRED');
                    return;
		}
	    }
            /* symbol */
	    let symbol   = p3.symbol();
            let replaced = p2;
	    for (let s_idx in symbol) {
                replaced = replaced.split(symbol[s_idx]);
                replaced = replaced.join('');
	    }
            let symbol_chk = false;
            if ((true === p3.letter()) && (true === p3.number())) {
                if (replaced.match(/^[A-Za-z0-9]*$/)) {
                    symbol_chk = true;
                }
            } else if (true === p3.letter()) {
                if (replaced.match(/^[A-Za-z]*$/)) {
                    symbol_chk = true;
                }
            } else if (true === p3.number()) {
                if (replaced.match(/^[0-9]*$/)) {
                    symbol_chk = true;
                }
            }
            if (false === symbol_chk) {
                p3.execListener('NOT_MATCHED');
                return;
            }
            
	    /* length */
	    let max_len = p3.maxLength();
	    if ((null !== max_len) && (p2.length > max_len)) {
                p3.execListener('INVALID_LENGTH');
                return;
	    }
	    p3.execListener(null);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    component (prm) {
        try {
            let ret = super.component(prm);
            if (undefined === prm) {
	        /* getter */
                return ret;
	    }

            if (true !== comutl.isinc(prm,'FormItem')) {
                console.error(this.name() + ' is event for FormItem.');
                return;
            }
            prm.changeEvent(this.valueCheck,this);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    maxLength (prm) {
        try {
            return this.confmng('maxLength',prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }


    
    contents (dom) {}
}
/* end of file */

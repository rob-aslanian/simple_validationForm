/**
 * Simple Validation Object 
 * which contains some functions and exept one function for validate
 * 
 * To use this object in your code in your html must be form and 
 * in this form must be some inputs with attribute name 
 * @example 
 *  <form>
 *      <input type="text" name="name">
 *      ...
 *  </form>
 */


const CONFIG = {

    inputs:'form > input:not([type="submit"])',
    showErrorMessages:true,
    submitBtn:'form > input[type="submit"]',
    errorsClass:'errors',
    useClasses:true,

    //** For Validate **//
    countryCode:995,
    telLength:9,
    
    nameMinLength:4,
    nameMaxLength:12,
    
    passMinLength:4,
    passMaxLength:24,

    //** Success  **//
    successColor:'#66bb6a',
    successClass:'correct',
    
    //** Error **//
    errorColor:'#d32f2f ',
    errorClass:'error'
    
}


/** @private  */
function _create(value , nameClass){

    let el = document.createElement(value);

    if(!_isUndefined(nameClass))
       el.className = nameClass;

   return el;
}

/** @private  */
function _isEqualTypes(value1, value2){
    return typeof value1 === typeof value2;
}

/** @private  */
function _selectAll(elems){
    return document.querySelectorAll(elems);
}

/** @private  */
function _select(elem){
    return document.querySelector(elem);
}

/** @private  */
function _isUndefined(value){
    return value === undefined;
}

const Validator = () => {

    /** Regex Patterns  */
    const patterns = {
        name:new RegExp(`^([a-z\\d-_]{${CONFIG.nameMinLength},${CONFIG.nameMaxLength}})$`, 'i'),
        email:/^([\w\.-]+)@(\D{2,10})\.([a-z]{2,10})(\.[a-z])?$/,
        telephone:new RegExp(`^${CONFIG.countryCode}\\d{${CONFIG.telLength}}$`),
        password: new RegExp(`^[A-Z]\\w{${CONFIG.passMinLength},${CONFIG.passMaxLength}}$`)
    };

    /**  Erros Messages */
    const errors = {
        name:`Name must be more than 4 character and less than 12 aslo can contain(-_)`,
        email:' Please enter a valid email address',
        telephone: `Telephone number must start with number ${CONFIG.countryCode} and length must be ${CONFIG.telLength} `,
        password: `Password must begin with big character and be more than ${CONFIG.passMinLength} and less than ${CONFIG.passMaxLength} character `
    };
    /** Check if all inputs is correct @param {Node} */
    const isAllCorrect = (submit) => {

        let form = _select(CONFIG.inputs).parentNode,
            inputs = Array.prototype.slice.apply(_selectAll(CONFIG.inputs));
            
       form.addEventListener('change' , () => {

         let index = 0;

         inputs.forEach(input => {
                if(input.classList.contains(CONFIG.successClass) 
                || input.getAttribute('data-correct'))
                    index++;

                if(index == inputs.length)
                    return submit.disabled = false;
                
            });
        })
        
    }

    return {
        set(obj){  
			try{
                let  _objKeys  = Object.keys(obj);

                _objKeys.map(key=> {
                        try{
                                    
                            if(CONFIG.hasOwnProperty(key)){  
                                if(_isEqualTypes(obj[key], CONFIG[key])){

                                    let _obj = Object.create(null);                 
                                    _obj[key] = obj[key];
                                    Object.assign(CONFIG , _obj);

                                }
                                else 
                                    throw `Type of ${obj[key]} not equls to CONIG type`
                            }
                            else
                                throw 'Inccorect object name';
                
                        }
                        catch(e){console.error(e)}
                });
			}
			catch(e){
				throw 'Error:Params Must be an object';
			}
        },
        validate(){

            let inputs       = _selectAll(CONFIG.inputs),
                errorContent = CONFIG.showErrorMessages ?  _create('p' , CONFIG.errorsClass) : null,
                submit       = _select(CONFIG.submitBtn);

                submit !== null ? submit.disabled = true : false;

            if(!_isUndefined(inputs)){

                inputs.forEach(input => {
                    input.addEventListener('keyup' , (e) => {

                        let _this     = e.target, 
                            filedName = e.target.name,
                            value     = e.target.value,
                            pattern   = patterns[filedName];

                            errorContent !== null ? errorContent.remove() : false;

                        if(!_isUndefined(pattern)){

                            if(pattern.test(value)){
                                _this.style.borderColor = CONFIG.successColor;
                                CONFIG.useClasses ?  
                                    _this.classList.replace(CONFIG.errorClass , CONFIG.successClass) : 
                                    _this.setAttribute('data-correct' , true);

                                isAllCorrect(submit);
                                
                            }
                            else{
                              
                                _this.style.borderColor = CONFIG.errorColor;

                                CONFIG.useClasses ? 
                                     _this.classList.add(CONFIG.errorClass) : 
                                     _this.removeAttribute('data-correct');

                                if(CONFIG.showErrorMessages){
                                     errorContent.textContent = errors[filedName];
                                    _this.parentNode.insertBefore(errorContent, _this.nextSibling);
                                }
                               
                            }

                        }

                    });
                    
                });
            }
        
        }
    }
  
}
window.Validator = Validator();

export default Validator();









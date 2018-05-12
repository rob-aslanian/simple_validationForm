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
function _type(val){
    return Object.prototype.toString.call(val);
}

/** @private  */
function _create(value , nameClass){

    let el = document.createElement(value);

    if(!_isUndefined(nameClass))
       el.className = nameClass;

   return el;
}

/** @private  */
function _isRegExp(val){
    return _type(val) === '[object RegExp]';
}

/** @private  */
function _isString(val){
    return _type(val) === '[object String]' &&  typeof val  === 'string';
}

/** @private  */
function _isObject(val){
    return _type(val) === '[object Object]' &&  typeof val  === 'object';
}

/** @private  */
function _isBoolean(val){
    return _type(val) === '[object Boolean]' &&  typeof val  === 'boolean';
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
                else
                    return submit.disabled = true;
                
            });
        })
        
    }
    return {
        /**
         * @method
         * Change any setting whiich is exist in @const CONFIG object 
         * 
         * @param {Object} obj 
         */
        set(obj){  

			try{
                let  _objKeys  = Object.keys(obj); // Get input object keys 

                _objKeys.map(key=> {
                        try{
                                    
                            //** While CONFIG has the key which has a input object **//
                            if(CONFIG.hasOwnProperty(key)){ 

                                //** While input object value type equal to CONFIG value type  **//
                                if(_isEqualTypes(obj[key], CONFIG[key])){

                                    let _obj = Object.create(null);                 
                                    _obj[key] = obj[key];
                                    Object.assign(CONFIG , _obj); // Edit CONFIG objecy

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
        /**
         * @method
         * Add new pattern for validate and also 
         * can add errors message
         * 
         * @param {Object|[String,RegExp,Boolean|String]} args 
         */
        addPattern(...args){

           //** When args type is Object **//
           if(_isObject(args[0])){

               let _obj  = args[0],
                   props = Object.getOwnPropertyNames(_obj); // Get Object property names for then to check if exist that name in patterns array or not

                //** Unique Object properties  **//
                props = props.filter((el , index , array) => array.indexOf(el) === index );

                for(let k of props){   
                    
                    //** While that property not exist in array **//
                    if(_isUndefined(patterns[k])){
                        
                        //** Check if values type is  regexp **//
                        if(_isRegExp(_obj[k])){  
                            
                            //** While true , generate errors  **//
                            if(args[1] && _isBoolean(args[1]))
                                errors[k] = `Please enter a valid ${k} value`;
                            
                            //** Set to patterns array object property as name **//
                            patterns[k] = _obj[k];
                        }

                        else throw `${k} value type must be a regexp`
                    }
                    else throw `${k} is already  exist in pattern`
                    
                }
           }
            
           //** While args type is`n object **//
           else{

               //** Function can only get 3 arguments **//
               if(args.length >= 4)
                  throw 'The function must have 3 arguments , or one object';

               //** Check if that name is exist in pattern **//
               else if(!_isUndefined(patterns[args[0]]))
                  throw `${args[0]} is already  exist in pattern`

                
               else if(_isString(args[0]) && _isRegExp(args[1])){

                  //** While is boolean just generate error **//
                  if(args[2] && _isBoolean(args[2]))
                        errors[args[0]] = `Please enter a valid ${args[0]} value`;

                 //** Set custom error message **//
                  else if(_isString(args[2]))
                        errors[args[0]] = args[2];

                  return patterns[args[0]] = args[1];
               }

               else
                 throw 'First argument type must be a string and second type must be a regexp';
           }
                 
           
        },
        /**
         * @method
         * Main method for validate 
         */
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
                                    _this.classList.remove(CONFIG.errorClass) ||
                                    _this.classList.add(CONFIG.successClass) : 
                                    _this.setAttribute('data-correct' , true);

                                isAllCorrect(submit);
                                
                            }
                            else{
                              
                                _this.style.borderColor = CONFIG.errorColor;

                                CONFIG.useClasses ? 
                                     _this.classList.remove(CONFIG.successClass) ||
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









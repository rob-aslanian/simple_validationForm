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
const Validation = {

    Inputs: 'input', 
    p_tag:document.createElement('p'), // Create p tag for to be insert errors message
    set inputs(arg) { this.Inputs = arg}, // Can set inputs, example( if in form you want to find inputs by class name)
    get inputs(){ return document.querySelectorAll(`form > ${this.Inputs}`) }, // Can get inputs 

    /**
     * Validation Function
     * @param {Event} e 
     */
    validate(e){

        let filedName = e.target.name;  
        let value = this.value;
        let pattern = Validation.patterns[filedName];

        Validation.p_tag.remove();
        Validation.removeClass.call(this);

        if(Validation.patterns[filedName] !== undefined && value !== ''){

            if(pattern.test(value)){
                this.className = 'valid';
                Validation.p_tag.remove();
            }
            else{
                Validation.p_tag.className = 'errors';
                Validation.p_tag.textContent = Validation.errors[filedName];

                this.parentNode.insertBefore(Validation.p_tag , this.nextSibling);
                this.className = 'invalid';
            }
            
        }   
        
    },
    /** Regex Patterns  */
    patterns: {
        name:/^([a-z\d-_]{4,12})$/i,
        email:/^([\w\.-]+)@(\D{2,10})\.([a-z]{2,10})(\.[a-z])?$/,
        telephone:/^5\d{8}$/,
        password: /^[A-Z]\w{4,24}$/
    },
    /**  Erros Messages */
    errors: {
        name:'Name must be more than 4 character and less than 12 aslo can contain(-_)',
        email:' Please enter a valid email address',
        telephone: 'Telephone number must start with number 5 and length must be 8',
        password: 'Password must begin with big character and be more than 4 and less than 24 character '
    },
    removeClass(){
        this.classList.remove('valid');
        this.classList.remove('invalid');
    }
 
}


/** Example  */
Validation.inputs.forEach(input => {
    input.addEventListener('keyup' , Validation.validate)
});



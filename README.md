# Simple Validation Form 


### Install 

`npm install --save simple-validation-form`

### Configuration

|Property|Type|Info|Default|
|:---|:---|:---|:---|
|inputs|String\|Node|Containts inputs which you want to validate|form > input:not([type="submit"])
|showErrorMessages|Boolean|To show or not error messages|true
|submitBtn|String\|Node|Form Button , which is disabled until the ALL inputs value is inccorect|form > input[type="submit"]
|errorsClass|String\|Node|Error class which you can style how that you want , default is`t  styled |errors
|useClasses|Boolean|To use or not classes for inputs|true 
|countryCode|Number|Your country telephone number code (for validation)|[995](https://countrycode.org/)
|telLength|Number|Telephone number length (for validation)|9
|nameMinLength|Number|Name input MIN length (for validation)|4
|nameMaxLength|Number|Name input MAX length (for validation)|12
|successColor|String|Border Color if validate is correct|#66bb6a
|errorColor|String|Border Color if validate is inccorect|#d32f2f
|successClass|String\|Node|The class for input if it correct validate , default not styled|correct
|errorClass|String\|Node|The class for input if  it inccorect validate , default not styled|error

### Important
Use name attribute for inputs , otherwise validaton can`t work !

For now  , you can use this names:
- name
- email 
- telephone 
- password 

### Static Html 


```html


<!-- Example -->

......
 <form>
   <!-- INPUT MUST HAVE NAME ATTRIBUTE FOR VALIDATE , WITHOUT IT 
        DOES`T WORK!!! AND NAME VALUE MUST BE EQUAL TO TYPE VALUE
        FOR CORRECT VALIDATE
        -->
   <input type="text" name="name" placeholder="Some name..." class="test">
   <input type="email" name="email" placeholder="example@exapmle">
   .....
  
    <input type="submit" value="Submit">
</form>

......
 <script src="/node_modules/simple-validation-form/simple_validation.js"></script>
 <script>
    // Set Validate 
    Validator.set({
      showErrorMessages:false,
      countryCode:1
      //.........///
    });
    
   // Start Validate 
   Validator.validate();
 </script>

```
### In NodeJs 
```js
import 'simple-validation-form'
```

const ruless = (context) => {
    return {
        numperInputRules:  [v => parseFloat(v) >= 0 || 'this field is required'],
        requiredRules: [v => !!v || context.$t('field_is_required')],
        moreThanRules: [v => !!v || 'Field is required', v =>  (v+"").replaceAll(',','') >= 0 || 'Must be more than 0'],
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
        ],
        passwordRules: [
            v => !!v || 'Password is required',
            v => (v && v.length >= 5) || 'Password must have 5+ characters',
           // v => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) || 'Password must contain at least lowercase letter, one number, a special character and one uppercase letter',
        ],
        checkboxRules: [
            v => !!v || 'You must agree to continue!'
        ],

        numericRules: [
            v => !!typeof (Number(v)) == "number" || 'You must input a number!'
        ],
        emailRules2: [
            v => !!v || 'Email is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        passwordRules2: [
            v => !!v || 'Password is required',
            v => (v && v.length >= 5) || 'Password must have 5+ characters',
            v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character',
            v => /(?=.*\d)/.test(v) || 'Must have one number',
            v => /([!@$%])/.test(v) || 'Must have one special character [!@#$%]'
        ]
    }
}


export default ruless

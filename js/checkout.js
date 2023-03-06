const form = document.getElementById("form");
// Array with input fields
const arrayForm = [{
		'type': 'text',
		'inputID': 'fName',
	},
	{
		'type': 'text',
		'inputID': 'fLastN',
	},
	{
		'type': 'number',
		'inputID': 'fPhone',
	},
	{
		'type': 'mix',
		'inputID': 'fPassword',
	},
	{
		'type': 'email',
		'inputID': 'fEmail',
	},
	{
		'type': 'mix',
		'inputID': 'fAddress',
	},
]

arrayForm.map(input => {
	// Get the input fields
	input.fieldElement = document.getElementById(input.inputID);
})

function show_validation_message(fieldElement) {
	fieldElement.style.display = 'block';
	fieldElement.classList.add("is-invalid");
}

function hide_validation_message(fieldElement) {
	fieldElement.classList.remove("is-invalid");
	fieldElement.classList.add("is-valid");
}

function validate_empty_input_and_lenght_of_field(input) {
	//All fields are required & min 3 digits
	if (input.value == "" || input.value.length < 3) {
		return true;
	} else {
		return false
	}
}

function validate_data_type(type, input) {
	//Validates type of data 
	if (type.includes('text')) {
		pattern = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
	} else if (type.includes('number')) {
		pattern = /^\d+$/gi;
	} else if (type.includes('email')) {
		pattern = /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/;
	} else if (type.includes('mix')) {
		pattern = /^[A-Za-z0-9]{8,12}$/;
	}
	return pattern.test(input.value);

}

function validate() {
	form.addEventListener("submit", (event) => {
		event.preventDefault();
		var error = 0;

		arrayForm.map(input => {
			if (validate_empty_input_and_lenght_of_field(input.fieldElement) || !validate_data_type(input.type, input.fieldElement)) {
				show_validation_message(input.fieldElement)
			} else {
				hide_validation_message(input.fieldElement)
			}
		})
	}, false)
}
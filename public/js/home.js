$(document).ready(function () {

    /*
    TODO:   The code below attaches a `keyup` event to `#number` text field.
            The code checks if the current number entered by the user in the
            text field does not exist in the database.

            If the current number exists in the database:
            - `#number` text field background color turns to red
            - `#error` displays an error message `Number already registered`
            - `#submit` is disabled

            else if the current number does not exist in the database:
            - `#number` text field background color turns back to `#E3E3E3`
            - `#error` displays no error message
            - `#submit` is enabled
    */
    $('#number').keyup(function () {
        // your code here
        var idVal = $('#number').val();

        $.get('/getCheckNumber', {idVal: idVal}, function (result) {
            if(result.idVal == idVal) {
                $('#number').css('background-color', 'red');
                $('#error').text('ID number already registered');
                $('#submit').prop('disabled', true);
            }
    
            else {
                $('#number').css('background-color', '#E3E3E3');
                $('#error').text('');
                $('#submit').prop('disabled', false);
            }
        });
    });

    /*
    TODO:   The code below attaches a `click` event to `#submit` button.
            The code checks if both text fields are not empty. The code
            should communicate asynchronously with the server to save
            the information in the database.

            The new contact should be displayed immediately, and without
            refreshing the page, after the values are saved in the database.

            The name and the number fields are reset to empty values.
    */
    $('#submit').click(function () {
        // your code here
        var idName = $('#name').val();
        var idVal = $('#number').val();
        
        if (idName != '' && idVal != '' ) {
            $.get('/add', {idName: idName, idVal: idVal}, function (result) {
                $('#contacts').append(result);
            });
            $('#name').val('');
            $('#number').val('');
        } else if (idName == '' && idVal == '') {
            alert('Fill in the fields');
        } else if (idVal == '') {
            alert('Fill in number field');
        } else {
            alert('Fill in name field');
        }
    });

    /*
    TODO:   The code below attaches a `click` event to `.remove` buttons
            inside the `<div>` `#contacts`.
            The code deletes the specific contact associated to the
            specific `.remove` button, then removes the its parent `<div>` of
            class `.contact`.
    */
    $('#contacts').on('click', '.remove', function () {
        // your code here
        var idName = $(this).prev().children('.text:nth-child(1)').text();
        var idVal = $(this).prev().children('.text:nth-child(2)').text();
        var parseName = idName.split(" ");
        var parent = this.parentNode;
        
        $.get('/delete', {idName: idName.trim(), idVal: parseInt(idVal)}, function (result) {
            parent.parentNode.removeChild(parent);
        });
    });

})

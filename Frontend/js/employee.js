$(document).ready(function(){
    getAllEmployees();

    $(document).on('click', '#empTable tr', function(){
        var col0 = $(this).find('td:eq(0)').text();
        var col1 = $(this).find('td:eq(1)').text();
        var col2 = $(this).find('td:eq(2)').text();
        var col3 = $(this).find('td:eq(3)').text();

        $('#employeeID').val(col0);
        $('#employeeName').val(col1);
        $('#employeeAddress').val(col2);
        $('#employeeNumber').val(col3);

        $('html, body').animate({
            scrollTop: $("#employeeID").offset().top
        }, 1000);
    });
});

function saveEmployee() {
    let name = $('#employeeName').val();
    let address = $('#employeeAddress').val();
    let number = $('#employeeNumber').val();

    $.ajax({
        method: "POST",
        contentType: "application/json",
        url: "http://localhost:8080/api/v1/employee/saveEmployee",
        async: true,
        data: JSON.stringify({
            "empID": "",
            "empName": name,
            "empAddress": address,
            "empMNum": number
        }),
        success: function(data) {
            alert("Saved");
            getAllEmployees();
            clearForm();
        },
        error: function(xhr, exception) {
            alert("Error");
        }
    });
}

function updateEmployee() {
    let empID = $('#employeeID').val();
    let name = $('#employeeName').val();
    let address = $('#employeeAddress').val();
    let number = $('#employeeNumber').val();

    $.ajax({
        method: "PUT",
        contentType: "application/json",
        url: "http://localhost:8080/api/v1/employee/updateEmployee",
        async: true,
        data: JSON.stringify({
            "empID": empID,
            "empName": name,
            "empAddress": address,
            "empMNum": number
        }),
        success: function(data) {
            alert("Updated");
            getAllEmployees();
            clearForm();
        },
        error: function(xhr, exception) {
            alert("Error");
        }
    });
}

function deleteEmployee() {
    let empID = $('#employeeID').val();

    $.ajax({
        method: "DELETE",
        url: "http://localhost:8080/api/v1/employee/deleteEmployee/" + empID,
        async: true,
        success: function(data) {
            alert("Deleted");
            getAllEmployees();
            clearForm();
        },
        error: function(xhr, exception) {
            alert("Error");
        }
    });
}

function getAllEmployees() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/employee/getAllEmployees",
        async: true,
        success: function(data) {
            if (data.code === '00') {
                $('#empTable').empty();
                for (let emp of data.content) {
                    let row = `
                        <tr>
                            <td>${emp.empID}</td>
                            <td>${emp.empName}</td>
                            <td>${emp.empAddress}</td>
                            <td>${emp.empMNum}</td>
                        </tr>`;
                    $('#empTable').append(row);
                }
            }
        },
        error: function(xhr, exception) {
            alert("Error");
        }
    });
}

function clearForm() {
    $('#employeeID').val('');
    $('#employeeName').val('');
    $('#employeeAddress').val('');
    $('#employeeNumber').val('');
}

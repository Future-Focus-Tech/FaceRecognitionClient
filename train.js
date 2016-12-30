var faces = [];
function Train() {
    var popup = window.open("popup.html", "Train", 'width=400,height=200,scrollbars=yes');
    popup.onunload = function () {
        console.log(faces);
        var field = document.getElementById("mappedId");
        if (field.value == '' || isNaN(field.value)) {
            console.log("Must be numbers");
        }
        else {
            console.log(faces.length);
            var arrayOfValues = fillArray(field.value, faces.length);
            console.log(arrayOfValues.length);
            console.log(arrayOfValues);
            $.ajax({
                type: "POST",
                url: "https://192.168.33.10/openmrs/ws/rest/v1/facerec/train",
                data: {
                    facesData: faces,
                    mappedValues: arrayOfValues
                },
                success: function (response) {
                    console.log(response);
                },
                error: function (e) {
                    console.log('Error: ' + e);
                }
            });
            faces = [];
        }
    }
}

function Predict() {
    var popup = window.open("popup.html", "Predict", 'width=400,height=200,scrollbars=yes');
    popup.onunload = function () {
        console.log(faces);
        $.ajax({
            type: "POST",
            url: "https://192.168.33.10/openmrs/ws/rest/v1/facerec/predict",
            data: {
                facesData: faces
            },
            success: function (response) {
                console.log(response);
            },
            error: function (e) {
                console.log('Error: ' + e);
            }
        });
    }
}
function fillArray(value, len) {
    var arr = [];
    for (var i = 0; i < len; i++) {
        arr.push(value);
    }
    return arr;
}

function openPopUp() {
    var popup = window.open("popup.html", "Train", 'width=400,height=200,scrollbars=yes');
    popup.onbeforeunload = function () {
        console.log(faces);
    }
}

function setFaces(listOfFaces) {
    faces = listOfFaces;
    // console.log(faces)
}
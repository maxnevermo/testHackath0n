document.addEventListener('DOMContentLoaded', function () {
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var dd = String(today.getDate()).padStart(2, '0');
    var hh = String(today.getHours()).padStart(2, '0');
    var min = String(today.getMinutes()).padStart(2, '0');
    var todayStr = yyyy + '-' + mm + '-' + dd + 'T' + hh + ':' + min;

    var dateTimeInput = document.getElementById('input-deadline');
    dateTimeInput.min = todayStr;
});



function choosePhoto(button) {
    var input = button.nextElementSibling;
    input.click();
}

function addButtonEventListener(button) {
    button.addEventListener("click", function () {
        choosePhoto(button);
    });
}

function previewPhoto(event) {
    var input = event.target;
    var reader = new FileReader();

    reader.onload = function () {
        var dataURL = reader.result;
        var photoContainer = input.parentElement;

        // Очищаємо вміст контейнера перед вставкою нового зображення
        photoContainer.innerHTML = "";

        var img = document.createElement("img");
        img.src = dataURL;
        img.onload = function () {
            // Визначаємо співвідношення сторін зображення
            var aspectRatio = img.width / img.height;

            // Визначаємо розміри, щоб забезпечити пропорційне зменшення
            var newWidth = img.width;
            var newHeight = img.height;

            if (newWidth > photoContainer.offsetWidth) {
                newWidth = photoContainer.offsetWidth;
                newHeight = newWidth / aspectRatio;
            }

            if (newHeight > photoContainer.offsetHeight) {
                newHeight = photoContainer.offsetHeight;
                newWidth = newHeight * aspectRatio;
            }

            // Встановлюємо розміри зображення
            img.style.width = newWidth + "px";
            img.style.height = newHeight + "px";

            // Центруємо зображення
            var leftOffset = (photoContainer.offsetWidth - newWidth) / 2;
            var topOffset = (photoContainer.offsetHeight - newHeight) / 2;
            img.style.position = "absolute";
            img.style.left = leftOffset + "px";
            img.style.top = topOffset + "px";

            // Знаходимо наступний блок і додаємо кнопку
            var nextPhotoContainer = photoContainer.nextElementSibling;
            if (nextPhotoContainer) {
                var button = document.createElement("button");
                button.textContent = "Додати фото";
                addButtonEventListener(button);
                nextPhotoContainer.appendChild(button);
                var nextInput = document.createElement("input");
                nextInput.type = "file";
                nextInput.accept = "image/*";
                nextInput.style.display = "none";
                nextInput.addEventListener("change", previewPhoto);
                nextPhotoContainer.appendChild(nextInput);
            }

            // Додайте кнопку видалення зображення
            var deleteButton = document.createElement("button");
            deleteButton.textContent = "Видалити";
            deleteButton.classList.add("deleteButton");
            deleteButton.addEventListener("click", function () {
                photoContainer.remove(); // Видаляємо блок

                var allContainers = document.querySelectorAll(
                    ".div-row-photos .photoContainer"
                );
                var allContainersHaveImages = true;

                allContainers.forEach(function (container) {
                    if (!container.querySelector("img")) {
                        allContainersHaveImages = false;
                        return; // Вийти з циклу, якщо хоча б один контейнер не містить зображення
                    }
                });

                if (allContainersHaveImages) {
                    console.log("Всі контейнери містять зображення.");
                } else {
                    console.log("Хоча б один контейнер не містить зображення.");
                }

                if (allContainersHaveImages) {
                    // Якщо це останній блок в рядку, створюємо новий блок з кнопкою "Додати фото"
                    var newPhotoContainer = document.createElement("div");
                    newPhotoContainer.classList.add("photoContainer");
                    document
                        .querySelector(".div-row-photos")
                        .appendChild(newPhotoContainer);
                    var newButton = document.createElement("button");
                    newButton.textContent = "Додати фото";
                    addButtonEventListener(newButton);
                    newPhotoContainer.appendChild(newButton);
                    var newInput = document.createElement("input");
                    newInput.type = "file";
                    newInput.accept = "image/*";
                    newInput.style.display = "none";
                    newInput.addEventListener("change", previewPhoto);
                    newPhotoContainer.appendChild(newInput);
                } else {
                    // Якщо це не останній блок, створюємо пустий блок вкінці рядка
                    var newEmptyContainer = document.createElement("div");
                    newEmptyContainer.classList.add("photoContainer");
                    document
                        .querySelector(".div-row-photos")
                        .appendChild(newEmptyContainer);
                }
            });
            photoContainer.appendChild(deleteButton);
        };

        // Додаємо зображення до контейнера
        photoContainer.appendChild(img);
    };

    reader.readAsDataURL(input.files[0]);
}

function Publish() {
    var Name = document.getElementById("input-name").value;
    var Category = document.getElementById("select-category").value;
    var Price = document.getElementById("input-price").value;
    var Deadline = document.getElementById("input-deadline").value;
    var Description = document.getElementById("textarea-description").value;
    if (document.getElementById("radiobutton-online").checked) {
        var Format = "online";
        var Location = "";
    }
    if (document.getElementById("radiobutton-offline").checked) {
        var Format = "offline";
        var Location = document.getElementById("select-regions").value;
    }

    var userDataString = sessionStorage.getItem("userData");

    if (userDataString) {
        var userData = JSON.parse(userDataString);
        var CustomerId = userData._id;
    } else {
        console.error("User data not found in session storage");
    }

    //добавити перевірку чи userType == customer щоб замовник не додавав таски

    var task = {
        name: Name,
        description: Description,
        price: parseFloat(Price),
        category: [Category],
        deadline: Deadline,
        format: Format,
        location: Location,
        customer: CustomerId,
    };

    // Створення об'єкту для відправки на сервер
    var requestBody = {
        tasks: [task],
    };

    //запит на додавання в бд
    fetch(`/customer/${CustomerId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                console.log("Inccorect data");
                throw new Error("Inccorect data");
            }
        })
        .then((userData) => {
            console.log(userData);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    // Виведення об'єкту для перевірки
    console.log(JSON.stringify(requestBody));
}

function isNumberKey(evt) {
    var charCode = evt.which ? evt.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function countCharactersDescription() {
    var textarea = document.getElementById("textarea-description");
    var charCount = document.getElementById("char-count");
    var maxLength = 9000;

    var currentLength = textarea.value.length;
    charCount.textContent =
        "Кількість символів: " + currentLength + "/" + maxLength;

    // Якщо кількість символів перевищує максимальне значення, обмежуємо текст
    if (currentLength > maxLength) {
        textarea.value = textarea.value.substring(0, maxLength);
        charCount.textContent =
            "Кількість символів: " + maxLength + "/" + maxLength;
    }
}

function countCharactersName() {
    var input = document.getElementById("input-name");
    var charCount = document.getElementById("char-count-name");
    var maxLength = 70;

    var currentLength = input.value.length;
    charCount.textContent =
        "Кількість символів: " + currentLength + "/" + maxLength;

    // Якщо кількість символів перевищує максимальне значення, обмежуємо текст
    if (currentLength > maxLength) {
        input.value = input.value.substring(0, maxLength);
        charCount.textContent =
            "Кількість символів: " + maxLength + "/" + maxLength;
    }
}

function showSelectRegions() {
    document.getElementById("select-regions").style.opacity = "1";
    document.getElementById("select-regions").style.pointerEvents = "all";
}

function hideSelectRegions() {
    document.getElementById("select-regions").style.opacity = "0";
    document.getElementById("select-regions").style.pointerEvents = "none";
}

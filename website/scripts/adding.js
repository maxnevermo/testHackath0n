function choosePhoto(button) {
    var input = button.nextElementSibling;
    input.click();
}

function addButtonEventListener(button) {
    button.addEventListener('click', function () {
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
        photoContainer.innerHTML = '';

        var img = document.createElement('img');
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
            img.style.width = newWidth + 'px';
            img.style.height = newHeight + 'px';

            // Центруємо зображення
            var leftOffset = (photoContainer.offsetWidth - newWidth) / 2;
            var topOffset = (photoContainer.offsetHeight - newHeight) / 2;
            img.style.position = 'absolute';
            img.style.left = leftOffset + 'px';
            img.style.top = topOffset + 'px';

            // Знаходимо наступний блок і додаємо кнопку
            var nextPhotoContainer = photoContainer.nextElementSibling;
            if (nextPhotoContainer) {
                var button = document.createElement('button');
                button.textContent = 'Додати фото';
                addButtonEventListener(button);
                nextPhotoContainer.appendChild(button);
                var nextInput = document.createElement('input');
                nextInput.type = 'file';
                nextInput.accept = 'image/*';
                nextInput.style.display = 'none';
                nextInput.addEventListener('change', previewPhoto);
                nextPhotoContainer.appendChild(nextInput);
            }

            // Додайте кнопку видалення зображення
            var deleteButton = document.createElement('button');
            deleteButton.textContent = 'Видалити';
            deleteButton.classList.add('deleteButton');
            deleteButton.addEventListener('click', function () {
                photoContainer.remove(); // Видаляємо блок

                var allContainers = document.querySelectorAll('.div-row-photos .photoContainer');
                var allContainersHaveImages = true;

                allContainers.forEach(function (container) {
                    if (!container.querySelector('img')) {
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
                    var newPhotoContainer = document.createElement('div');
                    newPhotoContainer.classList.add('photoContainer');
                    document.querySelector('.div-row-photos').appendChild(newPhotoContainer);
                    var newButton = document.createElement('button');
                    newButton.textContent = 'Додати фото';
                    addButtonEventListener(newButton);
                    newPhotoContainer.appendChild(newButton);
                    var newInput = document.createElement('input');
                    newInput.type = 'file';
                    newInput.accept = 'image/*';
                    newInput.style.display = 'none';
                    newInput.addEventListener('change', previewPhoto);
                    newPhotoContainer.appendChild(newInput);
                } else {
                    // Якщо це не останній блок, створюємо пустий блок вкінці рядка
                    var newEmptyContainer = document.createElement('div');
                    newEmptyContainer.classList.add('photoContainer');
                    document.querySelector('.div-row-photos').appendChild(newEmptyContainer);
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
    var Name = document.getElementById('input-name').value;
    var Category = document.getElementById('select-category').value;
    var Price = document.getElementById('input-price').value;
    var Description = document.getElementById('textarea-description').value;
    if (document.getElementById('radiobutton-online').checked) {
        var Format = "online";
    }
    else {
        var Format = "offline";
    }

    var ContactPerson = document.getElementById('input-contact-person').value;
    var Email = document.getElementById('input-email').value;
    var PhoneNumber = document.getElementById('input-phone-number').value;

    console.log(Name, Category, Price, Description, Format, ContactPerson, Email, PhoneNumber);
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}


function countCharacters() {
    var textarea = document.getElementById('textarea-description');
    var charCount = document.getElementById('char-count');
    var maxLength = 9000;

    var currentLength = textarea.value.length;
    charCount.textContent = "Кількість символів: " + currentLength + "/" + maxLength;

    // Якщо кількість символів перевищує максимальне значення, обмежуємо текст
    if (currentLength > maxLength) {
        textarea.value = textarea.value.substring(0, maxLength);
        charCount.textContent = "Кількість символів: " + maxLength + "/" + maxLength;
    }
}




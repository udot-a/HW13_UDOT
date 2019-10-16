// ******************* REQUIRED *******************************************
const usersAvatar = {}
getServerData.onclick = (event) => {
    // debugger
    fetch(`https://json-server-with-router.glitch.me/users`)
        .then(response => response.json())
        .then(response => {
            statusString.innerText = 'Все Ok!!!'
            statusString.style = 'color: green;'
            for (let user in response) {
                if (response[user]['user-name'] && response[user]['user-photo'] && response[user]['user-photo'].indexOf(':image/') !== -1) {
                    Object.assign(usersAvatar, { [response[user]['user-name']]: response[user]['user-photo'] })
                    let elem = listUser.appendChild(document.createElement('option'))
                    elem.innerText = response[user]['user-name']
                }
            }
        }
        )
        .catch(() => {
            statusString.innerText = 'Что-то пошло не так...'
            statusString.style = 'color: red;'
        })
}
getAvatar.onclick = (event) => {
    if (listUser.options[listUser.selectedIndex].value === 'empty') alert('Выберите пользователя!!!')
    else {
        let image = required.appendChild(document.createElement('img'))
        image.style.width = '150px'
        image.title = `Аватар пользователя ${listUser.options[listUser.selectedIndex].text}`
        image.src = usersAvatar[listUser.options[listUser.selectedIndex].text]
        image.id = 'avatarPicture'
    }
}
listUser.onchange = (event) => {
    let delImg = document.getElementById('avatarPicture')
    delImg && delImg.remove()
}

// ******************* ADDITIONAL #1 *******************************************
var addElem = tagName => additonalOne.appendChild(
    document.createElement(tagName)
)

var selector = addElem('input')
selector.type = 'file'
selector.multiple = true
selector.id = 'selectImages'
selector.style.display = 'none'

var label = addElem('label')

label.htmlFor = 'selectImages'
label.innerText = 'Select images'

var testFile = file => new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => {
        event.target.result.indexOf(':image/') !== -1 ?
            resolve(event.target.result) : reject(`В результате глубокого анализа оказалось, что файл ${file.name} это не картинка :)`)
    }
}
)

selector.onchange = function (event) {
    for (var file of event.target.files) {
        testFile(file)
            .then(result => addElem("img").src = result)
            .catch(error => console.error(error))
    }
}
// ******************* ADDITIONAL #2 *******************************************
// loadFile.onchange = (event) => {
//     let reader = new FileReader()
//     reader.readAsDataURL(loadFile.files[0])
//     reader.onload = (event) => {
//         if (loadFile.files[0].size < 100000 && event.target.result.indexOf(':image/')!==-1){
//             smallIcon.src = event.target.result
//             imgSrc.value = event.target.result
//         }
//         else {
//             console.warn('Большой размер файла или неверный формат!!!')
//             smallIcon.alt = 'Большой размер файла или неверный формат!!!'
//         }
//     }
// }
// submit.onclick = (event) => {
//     event.preventDefault()
//     let formData = new FormData(registration)
//     res = {}
//     formData.forEach (
//         ( val, key ) => Object.assign ( res, { [key]: val } )
//       )
//       fetch( 'http://ptsv2.com/t/udot-a/post', {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify ( res )
//       })
//       .then (response => response.json()).then(response => console.log(response))
// }
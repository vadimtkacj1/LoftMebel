const optionsMenuBloks = document.querySelector('.options-menu-bloks');
let optionsMenuItemsBloks = document.querySelectorAll('.options-menu_item-bloks')

optionsMenuBloks.onclick = function(event) {
    let targetElement = event.target;
    let subBlock = targetElement.parentElement.parentElement.parentElement.children[1];
    let subBlockTwo = targetElement.parentElement.parentElement.children[1];
    let mainElement;
    let subBlockElement;
    console.log(targetElement.className)
    if (targetElement.parentElement.className === 'options-menu_item-main' || targetElement.parentElement.className === 'wrapper-options-arrow') {
        if (subBlock.style.display === 'flex') return subBlock.style.display = "none";
        optionsMenuItemsBloks.forEach(e => e.style.display = 'none')
        subBlock.style.display = "flex";
    } 

    if (targetElement.className === 'options-menu_item-main') {
        if (subBlockTwo.style.display === 'flex') return subBlockTwo.style.display = "none";
        optionsMenuItemsBloks.forEach(e => e.style.display = 'none')
        subBlockTwo.style.display = "flex";
    }

    if (targetElement.parentElement.className === 'options-menu_item-bloks__item') {
        mainElement = event.target.parentElement.parentElement.previousElementSibling.children[0];
        subBlockElement = targetElement.outerHTML;
        targetElement.parentElement.innerHTML = mainElement.innerHTML;
        mainElement.innerHTML = subBlockElement;
    }   
    // if (targetElement.className == 'options-menu_item-main') {
    //     subBlock.style.display = 'flex';
    //     mainElement = targetElement;
    //     console.log(mainElement)
    // }
    // if (targetElement.className === 'options-menu_item-bloks__item') {
    //     mainElement.textContent = 'ss';
    // }   
}

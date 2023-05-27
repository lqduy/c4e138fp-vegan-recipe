import { getAllKeyToSearch } from "../database/database-recipes.js";


// Hàm lấy mảng các từ khóa gợi ý
function suggestForKey(typing) {
    return getAllKeyToSearch().filter((key) => key.includes(typing) || typing.includes(key));
}

// Gợi ý từ khóa khi nhập ô input
export function makeSuggestKeyToSearch() {
    const inputKey = document.getElementById('search-input');
    const suggestBox = document.getElementById('suggest-box');
    
    inputKey.addEventListener('input', (event) => {
        const inputValue = event.target.value.toLowerCase();
        suggestBox.innerHTML = suggestForKey(inputValue).reduce((string, key) => string + `<li><a>${key}</a></li>`, '');
        // Gán nút cho các thẻ a
        const aElements = suggestBox.querySelectorAll('a');
        aElements.forEach((aTag) => {
            aTag.addEventListener('click', () => {
                inputKey.value = aTag.innerText;
            });
        });
    });
}
makeSuggestKeyToSearch();

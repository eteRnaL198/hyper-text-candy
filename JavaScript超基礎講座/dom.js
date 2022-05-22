// DOM操作
console.log('------DOM操作------');

// 要素取得
(() => {
    const button = document.querySelector('button');
    console.log(button);
    
    const buttons = document.querySelectorAll('button');
    console.log(buttons);
})();

// 親要素取得
(() => {
    const child = document.querySelector('.dom_child');
    const parent = child.parentNode;
    console.log(parent);
    console.log(parent.childNodes);
    console.log(parent.children);
})();

// 兄弟要素取得
(() => {
    const two = document.querySelector('.dom_two');
    console.log(two.nextElementSibling);
    console.log(two.nextSibling);
    
    console.log(two.previousElementSibling);
    console.log(two.previousSibling);

})();

// forループ
(() => {
    const parent = document.querySelectorAll('.dom_parent');
    for(let i = 0; i < parent.length; i++) {
        console.log(parent[i].className);
    }
})();

// forEachループ
(() => {
    const children = document.querySelectorAll('.dom_child');
    children.forEach(child => console.log(child.innerHTML));
})();

// class属性toggle
(() => {
    const element = document.querySelector('.dom_class');
    element.classList.toggle('is-open');
})();


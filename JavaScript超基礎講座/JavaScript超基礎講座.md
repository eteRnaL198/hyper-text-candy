JavaScript超基礎講座
[link](https://www.hypertextcandy.com/vanilla-javascript-dom)

# DOM操作を学ぶ

## DOMとは
ブラウザがwebページを読み込む仕組み

1. webサーバから受け取ったHTML文書を解析し、_DOM(Document Object Model)_ と呼ばれるデータ構造に変換する。
1. DOMにCSSを解析して得られたスタイルルールを紐付けてレイアウトを計算し画面に描画(レンダリング)される。  

DOMはHTMLが持つ要素の親子関係をツリー構造で表現する  
JavaScriptはブラウザ内部にあるDOMにアクセスし、その内容を書き換える  
DOMが書き換えられると自動的に再描画される

## DOMの取得

### ノード
「DOMの取得」は正確には「DOMを構成するノードの情報の取得」と言える
ノードには主に以下の2種類がある。
- 要素ノード  
HTML要素のこと。属性などの情報(プロパティ)を持つ。
- テキストノード  
要素ではないテキスト部分のこと。

### Documentオブジェクト
``document``オブジェクトとは
ブラウザ内のJavaScriptエンジンにあらかじめ用意されているDOM操作などブラウザ固有の処理を行うためのオブジェクトの1つ。  
HTML文書を表すオブジェクトで、DOM操作のためのメソッドが含まれている。  

### id属性による検索
``getElementById``  
引数: id属性名  
返り値: ``HTMLElement / null``
```js
const button = document.getElementById('the-button');
```

### class属性による検索
``getElementByClassName``
引数: class属性名
返り値: ``HTMLCollection / null``
```js
const button = document.getElementByClassName('button');
```

### セレクターによる検索
1. ``querySelector``  
    引数: セレクター文字列(CSSと同じ)  
    返り値: ``HTMLElement / null``  
    複数存在する場合はHTML的に一番上に欠かれている要素が取得される。
    ```js
    const button = document.querySelector('#the-button');
    ```

1. ``querySelectorAll``
    引数: セレクター文字列(CSSと同じ)  
    返り値: ``NodeList / 空のNodeList``   
    文書の変更に対応しない(生きていない)
    ```js
    const buttons = document.querySelectorAll('.button');
    ```

``NodeList``はノードのコレクション(要素ノード、テキストノードを含む)で配列のようなイメージ 文書の変更に対応する(生きてる)  
``document``以外の要素に対して呼び出すと、子要素から指定のセレクターに合致する要素が検索される。
```html
<div class="box">
    <button class="button">click me</button>
</div>
```
```js
const box = document.querySelector('.box');
const button = box.querySelector('.button');
```

### 親要素を取得する
ある要素の親要素は``parentNode``プロパティから取得できる。
```html
<div class="box">
    <button class="button">click me</button>
</div>
```
```js
const button = document.querySelector('.button');
const box = button.parentNode;
```

### 子要素を取得する
```html
<ul>
    <li>One</li>
    <li>Two</li>
    <li>Three</li>
</ul>
```
- ``ChildNodes``
子要素の一覧を表す``NodeList``にアクセスできる。  
孫やそれ以降のノードは含まれない
```js
const list = document.querySelector('ul');
const listItems = list.childNodes;
```
- ``children``
子要素の一覧を表す``NodeList``にアクセスできる。  
HTML要素のみの一覧(HTMLCollection)を返す。(要素ノードのみ。テキストノードは含まない 文書の変更に対応する(生きてる))
```js
const listItems = list.children;
```

### 兄弟要素を取得する
```html
<p id="item-1">One</p>
<p id="item-2">Two</p>
```
- ``nextElementSibling``
次(下)に隣り合う要素ノードを取得できる
```js
const one = document.querySelector('#item-1');
console.log(one.nextElementSibling);
// -> <p id="item-2">Two</p>
```
- ``previousElementSibling``
前(上)に隣り合う要素ノードを取得できる
```js
const two = document.querySelector('#item-2');
console.log(two.previousSibling);
// -> <p id="item-1">One</p>
```

- ``nextSibing, previousSibling``
次(下)に隣り合うノードを保持しているが  
コード上の改行やホワイトスペースもテキストノードの形でDOMに組み込まれているため、要素ノードが取得されるとは限らない。 
```js
const one = document.querySelector('#item-1');
console.log(one.nextSibling);
// -> #text
console.log(one.previousSibling);
// -> #text
```

## ループ処理
``NodeList, HTMLCollection``に対してループ処理を行う場合は、少し工夫が必要  
### forループ
forループはそのままできる
```js
for(let i = 0; i < listItems.length; i++) {
    console.log(listItems[i].id);
}
```

### forEachループ
```html
<ul>
    <li id="item-1">One</li>
    <li id="item-2">Two</li>
    <li id="item-3">Three</li>
</ul>
```
- ``NodeList``の場合  
``forEach``メソッドを実装しているため直接呼び出せる
(callメソッド経由でArray型のforEachを呼び出す方法でも良い)
```js
const listItems = document.querySelectorAll('li');
listItems.forEach(item => console.log(item.id));
// or
Array.prototype.forEach.call(listItems, item => {
    console.log(item.id);
});

```
- ``HTMLCollection``の場合  
``forEach``メソッドを実装していないためcallメソッド経由でArray型に実装されたforEachを呼び出す
```js
const list = document.querySelector('ul');
const listItems = list.children;
Array.prototype.forEach.call(listItems, item => {
    console.log(item.id);
});
```

### 配列に変換する
一度配列に変換すれば自由にArray型メソッドを呼び出せる。
- ``slice``メソッドを用いる方法
    - NodeList
    ```js
    const listItems = document.querySelectorAll('li');
    const listItemsArray = Array.prototype.slice.call(listItems, 0);
    ```
    - HTMLCollection
    ```js
    const list = document.querySelector('ul');
    const listItems = list.children;
    const listItemsArray = Array.prototype.slice.call(listItems, 0);
    ```

- ``スプレッド構文``を用いる方法(楽)
```js
const listItemsArray = [...listItems];
```

## 属性の取得と更新
要素の属性値は``getAttribute/setAttribute``メソッドで取得/更新する  
```js
//属性値の取得
const content = element.getAttribute('content');
//属性値の更新
element.setAttribute('title', 'Hello World');
```  

クラス属性は複数の値を持つため``classList``プロパティを経由して操作する
```js
// クラスを追加する
element.classList.add('is-active');
// クラスを削除する
element.classList.remove('is-active');
// クラスの有無を切り替える
element.classList.toggle('is-active');
// クラスを持っているか boolean
element.classList.contains('is-active');
```

カスタムデータ属性
オリジナルの属性は``data-``で始まるのが標準仕様  
javaScritpからは``dataset``プロパティからアクセス可能  
```html
<div id="the-item" data-my-name="john">...</div>
```
```js
const element = document.querySelector('#the-item');
console.log(element.dataset.myName); // -> "john"
element.dtaset.myName = 'paul'; //値の更新
```

## DOMの生成
動的に要素を生成するには``createElement``メソッドを用いる  
```js
const image = document.createElement('img');
image.setAttribute('src', '/images/cute-cat.png');
image.setAttribute('alt', 'かわいい猫');
```

## DOMを挿入する  
要素の挿入には``insertAdjacentElement``メソッドを用いる
```js
element.innerAdjacentElement('挿入する位置', 挿入する要素);
```
- beforebegin: 対象要素の直前
- afterbegin: 対象要素の内部の最初
- beforeend: 対象要素の内部の最後
- afterend: 対象要素の直後

```html
<!-- beforebegin -->
<div id="target">
    <!-- afterbegin -->
    <div id="inner"></div>
    <!-- beforeend -->
</div>
<!-- afterend -->
```
```js
const elemnt = document.querySelector('#target');
element.innerAdjacentElement('beforebegin', image);
```

## DOMを削除する
``remove``メソッドを用いる
```js
element.remove();
```


# イベント処理を学ぶ

## JavaScriptにおけるイベント
ユーザとWebブラウザ間のインタラクション  
インタラクションとはユーザーがブラウザに対して行う操作に対して、  
ブラウザが反応してフィードバックを与える双方向の、相互作用のこと。  

## イベントの登録
イベントは``addEventListener``メソッドで登録する  
|引数|型|内容|必須|
|----|--|---|---|
|1|文字列|イベント名|YES|
|2|関数|イベントハンドラ|YES|
|3|真偽orオブジェクト|オプション|NO|
```js
const button = document.querySelector('#btn-1');
button.addEventListener('click', function(event) => {
    // ...
}
```
イベントハンドラの第一引数はイベントオブジェクト  
発生したイベントについての情報を保持するいくつかのプロパティとメソッドがある
```js
button.addEventListener('click', function(event) => {
    console.log(event.currentTarget); //イベントの登録対象 (ボタン要素)
})
```
イベントハンドラの中の``this``はイベントの登録対象を示す (アロー関数ではグローバルオブジェクトを示す)
```js
button.addEventListener('click', function(event) => {
    this.classList.toggle('hello'); // thisはボタン要素
});
button.addEventListener('click', (event) => {
    this.classList.toggle('hello'); // これは意図通りに動かない
})
```

``addEventListener``は実行するたびにイベントハンドラを追加していく  
対策はプロジェクトによって異なる  
```js
button.addEventListener('click', function() { console.log('hello'); });
button.addEventListener('click', function() { console.log('hello'); });
button.addEventListener('click', function() { console.log('hello'); });
// これだと3つ追加されてしまう
```

## イベントハンドラの取り消し
``removeEventListener``で取り消す  
名前付き関数で定義してから指定する。
```js
function sayHello() {
    console.log('hello');
}
button.addEventListener('click', sayHello);
button.removeEventListener('click', sayHello);
```

``addEventListener``で登録した関数と同一の関数を指定する必要がある。
```js
button.addEventListener('click', function() { consol.log('hello'); });
button.removeEventListener('click', function() { console.log('hello'); });
// 内容が同じだけの違う関数として扱われるため削除できない
```

## 一度切りのイベント
//js
const jsElement = document.createElement('p');
jsElement.className = 'text';
jsElement.innerText = 'Hello js';
const js = document.getElementById('js');
js.insertAdjacentElement('beforeend', jsElement);


//React
const reactElement = React.createElement('p', { className: 'text'}, ['Hello react']);
const react = document.getElementById('react');
ReactDOM.render(reactElement, react);


//React JSX
const reactJsxElement = <p className="text">Hello React JSX</p>
const reactJsx = document.getElementById('reactJsx');
ReactDOM.render(reactJsxElement, reactJsx);


//リスト描画とkey
const bandMembers = [
    { name: 'John', instrument: 'guitar'},
    { name: 'Paul', instrument: 'bass'},
    { name: 'George', instrument: 'guitar'},
    { name: 'Ringo', instrument: 'drums'},
]

const keions = (
    <ul>
        {bandMembers.map(member => (
            <li key={member.name}>
                    {member.name} plays {member.instrument}
            </li>
        ))}
    </ul>
);
const member = document.getElementById('member');
ReactDOM.render(keions, member);


// コンポーネント
function Component(props) {
    return <p id={props.id} className="text">{props.children}</p>;
}

const component = document.getElementById('component');
ReactDOM.render(<Component id="the-text">Hello component</Component>, component);



//exercise2
const Section = (props) => {
    return (
        <div id={props.id} className="box">
            <h1 className="title">{props.title}</h1>
            {props.children}
        </div>
    )
};

const DefinitionList = ({items}) => {
    return (
        <dl className="definition">
            {items.map(item => (
                <React.Fragment key={item.title}>
                    <dt className="definition-title">{item.title}</dt>
                    <dd className="definition-content">{item.content}</dd>
                </React.Fragment>
            ))}
        </dl>
    )
};

const app = (
    <>
        <Section id="react" title="React">
            <DefinitionList
                items={[
                    { title: "Itinial release", content: "2013/05"},
                    { title: "GitHub stars", content: "147,940"}
                ]}
            />
        </Section>
    </>
);

const jsxExercise2 = document.getElementById('jsxExercise2');
ReactDOM.render(app, jsxExercise2);


//state
const CountButton = () => {
    const countState = React.useState(0);
    // countState[0] => 状態
    // countState[1] => 状態を更新するための関数
    const count = countState[0];
    const setCount = countState[1];

    const handleClick = () => setCount(count + 1);

    return <button onClick={handleClick}>{count}</button>
}

ReactDOM.render(<CountButton/>, document.getElementById('state'));

//state 更新の影響範囲
const StateParent = () => {
    const [num, setNum] = React.useState(0);
    const handleClick = () => setNum(num + 1);
    return (
        <>
            <span>parent:<button onClick={handleClick}>{num}</button></span>
            <span>child:<StateChild num={num} /></span>
            <span>child:<StateChild num={num} /></span>
        </>
    );
}

const StateChild = ({num}) => {
    const [myNum, setMyNum] = React.useState(0);
    const handleClick = () => setMyNum(myNum + 1);
    return (
        <button className="child" onClick={handleClick}>{num + myNum}</button>
    )
}

const stateRange = document.getElementById('stateRange');
ReactDOM.render(<StateParent />, stateRange);

// stateExercise
const gifIds = [
    '10dU7AN7xsi1I4', 'tBxyh2hbwMiqc', 'ICOgUNjpvO0PC',
    '33OrjzUFwkwEg', 'MCfhrrNN1goH6', 'rwCX06Y5XpbLG'   
];

const getGifId = () => {
    const max = gifIds.length;
    const index = Math.floor(Math.random() * Math.floor(max));
    return gifIds[index];
}

const Gif = ({id}) => {
    const src = `https://media.giphy.com/media/${id}/giphy.gif`;
    return (
        <img src={src} alt=""/>
    )
}

const StateApp = () => {
    const [gifId, setGifId] = React.useState(gifIds[0]);
    const handleClick = () => {
        setGifId(getGifId());
    };
    return (
        <>
            <p>
                <button onClick={handleClick}>play</button>
            </p>
            <Gif id={gifId} />
        </>
    )
}

const stateExercise = document.getElementById('stateExercise');
ReactDOM.render(<StateApp />, stateExercise);


//form text
const TextApp = () => {
    const [name, setName] = React.useState('Hoge');
    const handleChange = e => setName(e.target.value);
    return (
        <>
            <p>Hello, {name}</p>
            <input value={name} onChange={handleChange} />
        </>
    );
}

const formText = document.getElementById('formText');
ReactDOM.render(<TextApp />, formText);

//component event
const ComponentTab = ({onChange}) => {
    return (
        <>
            <button onClick={() => onChange(1)}>React</button>
            <button onClick={() => onChange(2)}>Vue.js</button>
            <button onClick={() => onChange(3)}>Angular</button>
        </>
    )
}

const ComponentEventApp = () => {
    const [tab, setTab] = React.useState(1);
    const handleChange = val => setTab(val);
    return (
        <>
            <ComponentTab onChange={handleChange} />
            <p hidden={tab !== 1}>A JavaScript library for building user interfaces</p>
            <p hidden={tab !== 2}>The Progressive JavaScript Framework</p>
            <p hidden={tab !== 3}>One framework.  Mobile &amp; desktop.</p>
        </>
    )
}

const componentEvent = document.getElementById('componentEvent');
ReactDOM.render(<ComponentEventApp />, componentEvent);


//form&eventExercise1
const formEventOptions = [
    { value: 'js', label: 'JavaScript'},
    { value: 'py', label: 'Python'},
    { value: 'rb', label: 'Ruby'},
    { value: '', label: 'その他'},
];

const FormEventApp = () => {
    const [val, setVal] = React.useState('js');
    const [text, setText] = React.useState('');

    const handleRadioChange = e => setVal(e.target.value);
    const handleTextChange = e => setText(e.target.value);
    const getAnswer = () => {
        if(val === '') return text;
        else return formEventOptions.find(o=> o.value === val).label;
    };

    return (
        <>
            <p>好きなプログラミング言語を教えて下さい。</p>
            {formEventOptions.map((option) => (
                <label key={option.value}>
                    <input type="radio" value={option.value} name="favoriteLang" onChange={handleRadioChange} checked={val === option.value}/>
                    {option.label}
                </label>
            ))}
            {val === '' && (
                <div>自由記入<input type="text" name="favoriteLang" onChange={handleTextChange}/></div>
            )}
            <p>回答: {getAnswer()}</p>
        </>
    );
}

const formEventExercise1 = document.getElementById('formEventExercise1');
ReactDOM.render(<FormEventApp/>, formEventExercise1);

//form&eventExercise2
const Password = ({ value, onChange }) => {
    const [type, setType] = React.useState('password');
    const handleClick = () => setType(
        type === 'password' ? 'text' : 'password'
    );

    return (
        <>
            <input type={type} value={value} onChange={onChange} />
            <button onClick={handleClick}>
                {type === 'password' ? '見る' : '隠す'}
            </button>
        </>
    )
}

const FormPasswordApp = () => {
    const [val, setVal] = React.useState('');

    const handleChange = e => {
        setVal(e.target.value);
    }

    return (
        <>
        <p>パスワード</p>
        <Password value={val} onChange={handleChange}/>
        <p>{val.length}文字</p>
        </>
    )
}

const formEventExercise2 = document.getElementById('formEventExercise2');
ReactDOM.render(<FormPasswordApp />, formEventExercise2);

//formEventExercise3
const random = (max) => {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
}

const Guess = ({onGuess}) => {
    const [val, setVal] = React.useState(0);
    const handleChange = (e) => setVal(e.target.value);
    const handleClick = () => onGuess(val * 1);
    return (
        <>
            <input type="number" value={val} onChange={handleChange} />
            <button onClick={handleClick}>予想する</button>
        </>
    )
}

const NumberGuessing = () => {
    const max = 50;
    const initialCount = 5;
    const [answer, setAnswer] = React.useState(random(max));
    const [count, setCount] = React.useState(initialCount);
    const [message, setMessage] = React.useState('');

    const judge = num => {
        if(count === 0) return;
        setCount(count - 1);
        if(num === answer) {
            setMessage('正解です！');
        } else if(count === 1) {
            //stateを参照するための変数は更新関数呼び出し直後に参照されても更新はされず、
            //再レンダリング後に参照して更新される。
            setMessage('残念でした！ 正解は' + answer);
        } else if(num > answer) {
            setMessage('もっと小さいです');
        } else if(num < answer) {
            setMessage('もっと大きいです');
        }
    };

    const replay = () => {
        setAnswer(random(max));
        setCount(initialCount);
        setMessage('');
    };

    return(
        <>
            <Guess onGuess={judge}/>
            <p>{message}</p>
            <p>あと{count}回</p>
            <button onClick={replay}>はじめから</button>
        </>
    );
}

const formEventExercise3 = document.getElementById('formEventExercise3');
ReactDOM.render(<NumberGuessing />, formEventExercise3);

//Todoアプリ
const Filter = ({value, onChange}) => {
    const handleClick = (key, e) => {
        e.preventDefault();
        onChange(key);
    };
    return (
        <div className="panel-tabs">
            <a
                href="#"
                onClick={handleClick.bind(null, 'ALL')}
                className={classNames({'is-active': value === 'ALL'})}
            >ALL</a>
            <a
                href="#"
                onClick={handleClick.bind(null, 'TODO')}
                className={classNames({'is-active': value === 'TODO'})}
            >ToDo</a>
            <a
                href="#"
                onClick={handleClick.bind(null, 'DONE')}
                className={classNames({'is-active': value === 'DONE'})}
                >Done</a>
        </div>
    )
}

const Input = ({onAdd}) => {
    const [text, setText] = React.useState('');
    const handleChange = e => setText(e.target.value);
    const handleKeyDown = e => {
        if(e.key === 'Enter') {
            onAdd(text);
            setText('');
        }
    };
    return (
        <div className="panel-block">
            <input
                className="input"
                type="text"
                placeholder="Enter to add"
                value={text}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        </div>
    )
}

const TodoItem = ({item, onCheck}) => {
    const handleChange = () => onCheck(item);
    return (
        <label className="panel-block">
            <input
                type="checkbox"
                checked={item.done}
                onChange={handleChange}
            />
            <span
                // className={classNames({
                //     'has-text-grey-light' : item.done
                // })}
                className={item.done ? 'has-text-grey-light' : ''}
            >
                {item.text}
            </span>
        </label>
    )
}

const Todo = () => {
    const getKey = () => Math.random().toString(32).substring(2);
    const [items, setItems] = React.useState([
        { key: getKey(), text: 'Learn JavaScript', done: false},
        { key: getKey(), text: 'Learn React', done: false},
        { key: getKey(), text: 'Go some good sleep', done: false},
    ]);
    const [filter, setFilter] = React.useState('ALL');

    const handleCheck = checked => {
        const newItems = items.map(item => {
            if(item.key === checked.key) {
                item.done = !item.done;
            }
            return item;
        });
        setItems(newItems);
    }
    const handleAdd = text => {
        setItems([...items, { key: getKey(), text, done: false}]);
    };
    const handleFilterChange = value => setFilter(value);
    const displayItems = items.filter(item => {
        if(filter === 'ALL') return true;
        if(filter === 'TODO') return !item.done;
        if(filter === 'DONE') return item.done;
    })

    return (
        <div className="panel">
            <div className="panel-heading">⚛️ React ToDo</div>
            <Input onAdd={handleAdd} />
            < Filter
                onChange={handleFilterChange}
                value={filter}
            />
            {displayItems.map(item => (
                <TodoItem
                    key={item.key}
                    item={item}
                    onCheck={handleCheck}
                />
            ))}
            <div className="panel-block">
                {displayItems.length} items
            </div>
        </div>
    );
}

const TodoApp = () => {
    return (
        <div className="container is-fluid">
            <Todo />
        </div>
    )
}

const todoApplication = document.getElementById('todoApplication');
ReactDOM.render(<TodoApp />, todoApplication);

//アンマウント
const UnmountApp = () => {
    const [num, setNum] = React.useState(0);
    const handleClick = () => setNum(num+1);
    return (
        <>
            <button onClick={handleClick}>{num}</button>
            {num % 2 === 0 && <UnmountChildren />}
        </>
    );
}

const UnmountChildren = () => {
    React.useEffect(() => {
        console.log('hello');
        //↓クリーンアップ関数を返している
        // このコンポーネントがアンマウントされるときに実行される。
        return () => console.log('bye');
    }, []);
    return <span>I am a child. I like even number!!</span>
}

const unmount = document.getElementById('unmount');
ReactDOM.render(<UnmountApp />, unmount);


// sideEffectExercise 1
const Users = () => {
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
            (async function() {
                const response = await fetch(`https://randomuser.me/api/?results=5&nat=us&inc=gender,name,email`)
                    .then(res => res.json());
                setUsers(response.results);
            })();
        },[]);
        
    return (
        <table className="table is-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.email}>
                        <td>{user.name.title}. {user.name.first} {user.name.last}</td>
                        <td>{user.gender}</td>
                        <td>{user.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

const sideEffectExercise1 = document.getElementById("sideEffectExercise1");
ReactDOM.render(<Users />, sideEffectExercise1);

// sideEffectExercise 2
const TooltipButtonApp = () => {
    return(
        <TooltipButton id="myButton" content="Hello world!">
            Hover me!
        </TooltipButton>
    );
}

const TooltipButton = ({id, content, children}) => {
    React.useEffect(() => {
            tippy(`#${id}`, {content});
        }, [id, content]);

    return <button id={id}>{children}</button>;
}

const sideEffectExercise2 = document.getElementById("sideEffectExercise2");
ReactDOM.render(<TooltipButtonApp/>, sideEffectExercise2);

// カスタムフックの作成 1
const useTooltip = (id, content) => {
    React.useEffect(() => {
        tippy(`#${id}`, {content});
    }, [id, content]);
}

const CreateCustomHooksApp = () => {
    useTooltip('myButton', 'Hello World!');
    useTooltip('myParagraph', 'This is another tooltip.');

    return(
        <>
            <button id="myButton">Hover me</button>
            <p><span id="myParagraph">Hover me too!</span></p>
        </>
    )
}

const createCustomHooks = document.getElementById("createCustomHooks");
ReactDOM.render(<CreateCustomHooksApp />, createCustomHooks);

// カスタムフックの作成 2
const useUsers = () => {
    const [users, setUsers] = React.useState([]);
    React.useEffect(() => {
        (async () => {
            const response = await fetch('https://randomuser.me/api/?results=5&nat=us&inc=gender,name,email')
                .then(res => res.json());
            setUsers(response.results);
        })();
    }, []);
    return users;
}

const CreateCustomHooksApp2 = () => {
    const users = useUsers();
    return (
        <table className="table is-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.email}>
                        <td>{user.name.title}. {user.name.first} {user.name.last}</td>
                        <td>{user.gender}</td>
                        <td>{user.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

const createCustomHooks2 = document.getElementById("createCustomHooks2");
ReactDOM.render(<CreateCustomHooksApp2 />, createCustomHooks2);

// カスタムフック 練習問題
const CreateCustomHooksExerciseApp = () => {
    const gifs = useFetchGifs();
    const slider = useSlider('#slider', gifs);

    return (
        <div id="slider" className="swiper-container">
            <div className="swiper-wrapper">
                {gifs.map(gif => (
                    <img
                        key={gif.id}
                        className="swiper-slide"
                        src={`https://media.giphy.com/media/${gif.id}/giphy.gif`}
                        alt=""
                    />
                ))}
            </div>
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
        </div>
    );
}

const useFetchGifs = () => {
    const [gifs, setGifs] = React.useState([]);

    React.useEffect(() => {
        (async () => {
            const response = await mockApi();
            setGifs(response);
        })();
    }, []);

    return gifs;
}

const useSlider = (selector, items) => {
    const [slider, setSlider] = React.useState(null);

    React.useEffect(() => {
        const instance = new Swiper(selector, {
            spaceBetween: 10,
            slidersPerView: 2,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });

        setSlider(instance);
    }, [selector]);

    React.useEffect(() => {
        if(items.length > 0) {
            slider.update();
        }
    }, [items]);

    return slider;
}

const mockApi = () => {
    return new Promise(ok => {
        setTimeout(() => ok([
            { id: '10dU7AN7xsi1I4' },
            { id: 'tBxyh2hbwMiqc' },
            { id: 'ICOgUNjpvO0PC' },
            { id: '33OrjzUFwkwEg' },
            { id: 'MCfhrrNN1goH6' },
            { id: 'rwCX06Y5XpbLG' }
        ]), 1000);
    });
}

const createCustomHooksExercise = document.getElementById("createCustomHooksExercise");
ReactDOM.render(<CreateCustomHooksExerciseApp/>, createCustomHooksExercise);
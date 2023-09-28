import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]); // db에서 불러온 todo

  const [inputTodo, setInputTodo] = useState(""); //input에 입력할 값
  const [readOnly, setreadOnly] = useState(true); //readOnly
  const [updateTodo, setUpdateTodo] = useState("");

  //todo 불러오기
  useEffect(() => {
    const todoData = async () => {
      const res = await axios({
        method: "GET",
        url: "http://localhost:8000/todos",
      });
      console.log(res.data.data);
      setTodos(res.data.data);
    };
    todoData();
  }, []);

  const isreadOnly = () => {
    setreadOnly(false);
  };

  //todo 추가 - 엔터키
  const enterKeyDownAdd = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  //todo 추가 - 버튼
  const addTodo = async () => {
    console.log("버튼동작");
    if (inputTodo !== "") {
      const result = await axios({
        method: "POST",
        url: "http://localhost:8000/todo",
        data: {
          title: inputTodo,
        },
      });
      if (result) {
        console.log("todo add");
      }
    }
  };

  //todo 삭제
  const deleteTodo = async (id) => {
    console.log("버튼동작");
    const result = await axios({
      method: "DELETE",
      url: "http://localhost:8000/todo/:todoId",
      data: {
        id: id,
      },
    });
    if (result) {
      console.log("todo delete");
    }
  };

  //todo 수정 - 체크박스 체크
  const updateCheck = async (id, done) => {
    console.log(id);
    console.log(done);
    const result = await axios({
      method: "PATCH",
      url: "http://localhost:8000/todo/:todoId",
      data: {
        done: done,
        id: id,
      },
    });
    if (result) {
      console.log("todo update");
    }
  };

  //todo 수정 - 타이틀 변경
  const enterKeyDownUpdate = async (e, id) => {
    if (e.key === "Enter") {
      console.log("first");
      const result = await axios({
        method: "PATCH",
        url: "http://localhost:8000/todo/:todoId",
        data: {
          title: updateTodo,
          id: id,
        },
      });
      if (result) {
        console.log("todo update");
      }
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Add your new Todo"
          onChange={(e) => setInputTodo(e.target.value)}
          onKeyDown={(e) => enterKeyDownAdd(e)}
        />
        <button onClick={addTodo}>ADD</button>
        <br />
        <ul>
          {todos.map((value) => {
            return (
              <li key={value.id}>
                <input
                  type="checkbox"
                  checked={value.done === 0 ? false : true}
                  onClick={() =>
                    updateCheck(
                      { id: value.id },
                      { done: value.done === 0 ? 1 : 0 }
                    )
                  }
                />

                <input
                  type="text"
                  defaultValue={value.title}
                  onFocus={isreadOnly}
                  readOnly={readOnly}
                  onChange={(e) => setUpdateTodo(e.target.value)}
                  onKeyDown={(e) => enterKeyDownUpdate(e, value.id)}
                />
                <button onClick={() => deleteTodo({ id: value.id })}>
                  DELETE
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;

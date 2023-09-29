import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

/////////////////////////////style/////////////////////////////
const _Div = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  background-color: gainsboro;
`;

const _Container = styled.div`
  width: 500px;
  height: 90vh;
  background-color: white;
`;

const _Title = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  background-color: #008dff;
  justify-content: center;
  align-items: center;

  p {
    color: white;
    font-size: smaller;
    font-weight: bold;
  }
`;

const _InputContainer = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  align-items: center;
`;

const _Input = styled.input`
  width: 85%;
  height: 35px;
  border: 0px;
  border-bottom: 1.5px solid #008dff;
`;

const _Button = styled.button`
  width: 35px;
  height: 35px;
  text-align: center;
  border: none;
  background-color: #008dff;
  border-radius: 5px;
  color: white;
  font-size: large;

  &:hover {
    cursor: pointer;
  }
`;

const _ListTitle = styled.div`
  font-size: smaller;
  font-weight: bold;
  margin-top: 10px;
  margin-left: 10px;
`;

const _TodoList = styled.ul`
  overflow: auto;
  padding-left: 0px;
  margin-top: 0px;

  li {
    list-style: none;
    margin: 10px 5px;
    display: flex;
    align-items: center;
  }
`;

const _CheckBox = styled.input`
  height: 15px;
  width: 15px;
`;

const _ListInput = styled.input`
  width: 85%;
  height: 30px;
  border: none;
  border-bottom: 1px solid #eaeaea;
  margin-right: 5px;
`;

const _DeleteButton = styled.button`
  width: 35px;
  height: 35px;
  text-align: center;
  border: none;
  background-color: #cbcbcb;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

function App() {
  const [todos, setTodos] = useState([]); // db에서 불러온 todo
  const [inputTodo, setInputTodo] = useState(""); //input에 입력할 값
  const [readOnly, setreadOnly] = useState(true); //readOnly
  const [updateTodo, setUpdateTodo] = useState("");
  const navi = useNavigate();

  /////////////////////////////todo/////////////////////////////
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
        navi(0);
      }
    }
  };

  //todo 삭제
  const deleteTodo = async (id) => {
    console.log("버튼동작");
    const result = await axios({
      method: "DELETE",
      url: `http://localhost:8000/todo/:${id}`,
      data: {
        id: id,
      },
    });
    if (result) {
      navi(0);
    }
  };

  //todo 수정 - 체크박스 체크
  const updateCheck = async (id, done) => {
    console.log(id);
    console.log(done);
    const result = await axios({
      method: "PATCH",
      url: `http://localhost:8000/todo/:${id}`,
      data: {
        done: done,
        id: id,
      },
    });
    if (result) {
      navi(0);
    }
  };

  //todo 수정 - 타이틀 변경
  const enterKeyDownUpdate = async (e, id) => {
    if (e.key === "Enter") {
      console.log("first");
      const result = await axios({
        method: "PATCH",
        url: `http://localhost:8000/todo/:${id}`,
        data: {
          title: updateTodo,
          id: id,
        },
      });
      if (result) {
        navi(0);
      }
    }
  };

  return (
    <_Div>
      <_Container>
        <_Title>
          <p>📆 my Todo List 📆</p>
        </_Title>
        <_InputContainer>
          <_Input
            type="text"
            placeholder="Add your new Todo"
            onChange={(e) => setInputTodo(e.target.value)}
            onKeyDown={(e) => enterKeyDownAdd(e)}
          />
          <_Button onClick={addTodo}>+</_Button>
        </_InputContainer>
        <br />
        <_ListTitle>🚀todo List</_ListTitle>
        <_TodoList>
          {todos.map((value) => {
            return (
              <li key={value.id}>
                <_CheckBox
                  type="checkbox"
                  checked={value.done === 0 ? false : true}
                  onClick={() =>
                    updateCheck(
                      { id: value.id },
                      { done: value.done === 0 ? 1 : 0 }
                    )
                  }
                />

                <_ListInput
                  type="text"
                  defaultValue={value.title}
                  onFocus={isreadOnly}
                  readOnly={readOnly}
                  onChange={(e) => setUpdateTodo(e.target.value)}
                  onKeyDown={(e) => enterKeyDownUpdate(e, value.id)}
                />
                <_DeleteButton onClick={() => deleteTodo({ id: value.id })}>
                  🗑
                </_DeleteButton>
              </li>
            );
          })}
        </_TodoList>
      </_Container>
    </_Div>
  );
}

export default App;

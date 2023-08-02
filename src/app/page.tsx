"use client";
import React, { useState } from "react";
import styled from "styled-components";
import RequiresAuth from "@/components/RequireAuth";
import { Modal } from "@/components/Reusables/Modal";
// import { todos } from "@/data/todos";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, markComplete, deleteTodo } from "@/features/todo/todoSlice";
import type { RootState } from "@/lib/store";

export default function Home() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [todo, setTodo] = useState("");
  const [todoToEdit, setTodoToEdit] = useState(null);
  const todos = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch();

  const handleCreateTodo = () => {
    const newTodo = { todo, id: uuidv4(), completed: false };
    dispatch(addTodo(newTodo));
    setShowCreateModal(false);
  };

  const handleComplete = (todo: any) => {
    dispatch(markComplete(todo));
  };
  const handleDelete = (todo) => {
    dispatch(deleteTodo(todo));
  };

  const handleEditTodo = (todo) => {
    setTodoToEdit(todo);
    setShowEditModal(true);
  };

  const updateTodo = () => {
    setTodoList((prev) =>
      prev?.map((t) => (t?.id === todoToEdit?.id ? todoToEdit : t))
    );
    setShowEditModal(false);
  };

  return (
    <RequiresAuth>
      <Container>
        <Button onClick={() => setShowCreateModal(true)}>Add New Todo</Button>
        {showCreateModal && (
          <Modal>
            <AddTodoContainer>
              <span onClick={() => setShowCreateModal(false)}>X</span>
              <h1>Add your todo</h1>
              <Input
                type="text"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
              />
              <Button onClick={handleCreateTodo}>Add</Button>
            </AddTodoContainer>
          </Modal>
        )}
        {showEditModal && (
          <Modal>
            <Input
              type="text"
              value={todoToEdit?.todo}
              onChange={(e) =>
                setTodoToEdit((prev) => ({
                  ...prev,
                  todo: e.target.value,
                }))
              }
            />
            <button onClick={updateTodo}>save</button>
          </Modal>
        )}
        <TodosContainer>
          {todos?.length > 0 ? (
            <>
              {todos?.map((todo) => {
                return (
                  <TodoContainer key={todo?.id}>
                    <span
                      style={{
                        textDecoration: todo?.completed
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {todo?.todo}
                    </span>
                    <ActionContainer>
                      {todo?.completed ? (
                        <button onClick={() => handleDelete(todo)}>
                          Delete
                        </button>
                      ) : (
                        <button onClick={() => handleComplete(todo)}>
                          Done
                        </button>
                      )}
                      <button onClick={() => handleEditTodo(todo)}>Edit</button>
                    </ActionContainer>
                  </TodoContainer>
                );
              })}
            </>
          ) : (
            <h3>No todos added</h3>
          )}
        </TodosContainer>
      </Container>
    </RequiresAuth>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 88vh;
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 0px;
  row-gap: 20px;
`;

const Button = styled.button`
  padding: 5px 10px;
  font-size: 16px;
  &:hover {
    background: blue;
    color: white;
  }
`;

const AddTodoContainer = styled.div`
  width: 300px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  row-gap: 15px;
  background: white;
  border-radius: 15px;
`;

const Input = styled.input`
  outline: none;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
`;

const TodosContainer = styled.div`
  width: max-content;
  padding: 10px;
  border: 1px solid black;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 5px;
`;

const TodoContainer = styled.div`
  border: 1px solid black;
  padding: 10px;
  min-width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ActionContainer = styled.div`
  display: flex;
  gap: 5px;
`;

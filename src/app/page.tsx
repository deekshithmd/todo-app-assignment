"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import RequiresAuth from "@/components/RequireAuth";
import { Modal } from "@/components/Reusables/Modal";
// import { todos } from "@/data/todos";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  markComplete,
  deleteTodo,
  updateEditedTodo,
} from "@/features/todo/todoSlice";
import type { RootState } from "@/lib/store";
import { Button } from "@/components/Reusables/SharedStyling";
import Image from "next/image";
import Add from "../assets/add.svg";

export default function Home() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [todo, setTodo] = useState("");
  const [todoToEdit, setTodoToEdit] = useState(null);
  const todos = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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

  const updateTodo = () => {
    setShowEditModal(false);
    dispatch(updateEditedTodo(todoToEdit));
  };

  return (
    <RequiresAuth>
      <Container>
        <Button
          fontSize="16px"
          borderRadius="15px"
          justifyContent="space-between"
          onClick={() => setShowCreateModal(true)}
        >
          Add New Todo <Image src={Add} height={30} width={30} alt="add" />
        </Button>
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
            <Button onClick={updateTodo}>save</Button>
          </Modal>
        )}
        <TodosContainer>
          {todos?.length > 0 ? (
            <>
              {todos?.map((todo) => {
                return (
                  <TodoCard key={todo?.id}>
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
                        <Button onClick={() => handleDelete(todo)}>
                          Delete
                        </Button>
                      ) : (
                        <>
                          <Button onClick={() => handleComplete(todo)}>
                            Done
                          </Button>
                          <Button
                            onClick={() => {
                              setTodoToEdit(todo);
                              setShowEditModal(true);
                            }}
                          >
                            Edit
                          </Button>
                        </>
                      )}
                    </ActionContainer>
                  </TodoCard>
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
  background: #e0e0de;
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
  padding: 15px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 5px;
  border-radius: 10px;
  box-shadow: 1px 1px 2px 2px #848687;
`;

const TodoCard = styled.div`
  padding: 10px;
  min-width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  box-shadow: 1px 1px 2px 2px #848687;
`;

const ActionContainer = styled.div`
  display: flex;
  gap: 5px;
`;

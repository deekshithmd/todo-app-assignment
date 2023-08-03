"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import RequiresAuth from "@/components/RequireAuth";
import { Modal } from "@/components/Reusables/Modal";
import {
  addTodo,
  markComplete,
  deleteTodo,
  updateEditedTodo,
  markImportant,
} from "@/features/todo/todoSlice";
import type { RootState } from "@/lib/store";
import { Button, Icon, Text } from "@/components/Reusables/SharedStyling";
import Add from "../assets/add.svg";
import Close from "../assets/close.svg";
import Delete from "../assets/delete.svg";
import Tick from "../assets/tick.svg";
import Edit from "../assets/edit.svg";
import Star1 from "../assets/star-yellow.svg";
import Star2 from "../assets/star-white.svg";
import { TodoType, FilterType } from "@/types/type";

export default function Home() {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [todo, setTodo] = useState<string>("");
  const [todoToEdit, setTodoToEdit] = useState<TodoType | null>();
  const [selectedFilter, setSelectedFilter] = useState<FilterType>({
    id: 1,
    name: "All",
    value: "all",
  });
  const [filtered, setFiltered] = useState<TodoType[]>([]);
  const todos = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch();

  const filterData = [
    { id: 1, name: "All", value: "all" },
    { id: 2, name: "Important", value: "important" },
    { id: 3, name: "Completed", value: "completed" },
  ];

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (selectedFilter?.value === "all") {
      setFiltered(todos);
    } else {
      const todoData = todos?.filter(
        (item: TodoType) => item[selectedFilter?.value]
      );
      setFiltered(todoData);
    }
  }, [selectedFilter, todos]);

  const handleCreateTodo = () => {
    if (todo !== "") {
      const newTodo = {
        todo,
        id: uuidv4(),
        completed: false,
        important: false,
      };
      dispatch(addTodo(newTodo));
    }
    setShowCreateModal(false);
    setTodo("");
  };

  const handleComplete = (todo: TodoType) => {
    dispatch(markComplete(todo));
  };
  const handleDelete = (todo: TodoType) => {
    dispatch(deleteTodo(todo));
  };

  const updateTodo = () => {
    setShowEditModal(false);
    dispatch(updateEditedTodo(todoToEdit));
  };

  return (
    <RequiresAuth>
      <Container>
        <AddTodoContainer>
          <AddTodo onClick={() => setShowCreateModal(true)}>
            <div>Add a Task</div>
            <Icon src={Add} height={40} width={40} alt="add" />
          </AddTodo>
        </AddTodoContainer>
        {showCreateModal && (
          <Modal>
            <ModalInnerContainer>
              <ModalHeader>
                <Icon
                  src={Close}
                  height={30}
                  width={30}
                  alt="close"
                  onClick={() => setShowCreateModal(false)}
                />
              </ModalHeader>

              <Text fontSize="24px" fontWeight="700">
                Create your To-Do
              </Text>
              <Input
                type="text"
                placeholder="Type your to-do..."
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
              />
              <Button
                width="100px"
                borderRadius="15px"
                fontSize="16px"
                onClick={handleCreateTodo}
              >
                Create
              </Button>
            </ModalInnerContainer>
          </Modal>
        )}
        {showEditModal && (
          <Modal>
            <ModalInnerContainer>
              <ModalHeader>
                <Icon
                  src={Close}
                  height={30}
                  width={30}
                  alt="close"
                  onClick={() => setShowEditModal(false)}
                />
              </ModalHeader>
              <Input
                type="text"
                value={todoToEdit?.todo}
                onChange={(e) =>
                  setTodoToEdit((prev: any) => ({
                    ...prev,
                    todo: e.target.value,
                  }))
                }
              />
              <Button fontSize="16px" onClick={updateTodo}>
                Update
              </Button>
            </ModalInnerContainer>
          </Modal>
        )}
        <FilterContainer>
          {filterData.map((filter) => (
            <FilterItem
              key={filter.id}
              onClick={() => setSelectedFilter(filter)}
              background={
                selectedFilter?.value === filter?.value ? "#a19aed" : "#ffff"
              }
              color={selectedFilter?.value === filter?.value ? "#ffff" : null}
            >
              {filter.name}
            </FilterItem>
          ))}
        </FilterContainer>
        <TodosContainer>
          {filtered?.length > 0 ? (
            <>
              {filtered?.map((todo) => {
                return (
                  <TodoCard key={todo?.id}>
                    <StarContainer>
                      <Icon
                        src={todo?.important ? Star1 : Star2}
                        height={25}
                        width={25}
                        alt="star"
                        onClick={() => dispatch(markImportant(todo))}
                      />
                    </StarContainer>
                    <TodoTextContainer>
                      <span
                        style={{
                          textDecoration: todo?.completed
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {todo?.todo}
                      </span>
                    </TodoTextContainer>
                    <ActionContainer>
                      {todo?.completed ? (
                        <Button
                          width="200px"
                          borderRadius="15px"
                          fontSize="14px"
                          onClick={() => handleDelete(todo)}
                        >
                          Delete this Todo
                          <Icon
                            src={Delete}
                            height={20}
                            width={20}
                            alt="delete"
                          />
                        </Button>
                      ) : (
                        <>
                          <Button
                            width="200px"
                            borderRadius="15px"
                            onClick={() => handleComplete(todo)}
                          >
                            Mark Completed
                            <Icon
                              src={Tick}
                              height={20}
                              width={20}
                              alt="delete"
                            />
                          </Button>
                          <Button
                            width="200px"
                            borderRadius="15px"
                            onClick={() => {
                              setTodoToEdit(todo);
                              setShowEditModal(true);
                            }}
                          >
                            Edit this Todo
                            <Icon
                              src={Edit}
                              height={20}
                              width={20}
                              alt="delete"
                            />
                          </Button>
                        </>
                      )}
                    </ActionContainer>
                  </TodoCard>
                );
              })}
            </>
          ) : (
            <FilterContainer>
              <h3>No Todos Added here</h3>
            </FilterContainer>
          )}
        </TodosContainer>
      </Container>
    </RequiresAuth>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 88vh;
  margin-top: 12vh;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px;
  row-gap: 20px;
  background: #e0e0de;
  column-gap: 15px;
  flex-wrap: wrap;
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const AddTodoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddTodo = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f5f2a6;
`;

const ModalInnerContainer = styled.div`
  width: 300px;
  height: auto;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
  width: 100%;
  padding: 10px 50px;
  height: auto;
  min-height: 50vh;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 20px;
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const TodoCard = styled.div`
  box-sizing: border-box;
  padding: 10px;
  height: fit-content;
  min-height: 170px;
  min-width: 200px;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  row-gap: 5px;
  align-items: center;
  border-radius: 10px;
  box-shadow: 1px 1px 2px 2px #848687;
  position: relative;
`;

const StarContainer = styled.div`
  position: absolute;
  top: -12px;
  right: -12px;
`;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: auto;
  gap: 2px;
`;

const TodoTextContainer = styled.div`
  width: 100%;
  height: auto;
  min-height: 70px;
  background: white;
  padding: 10px;
  border-radius: 10px;
`;

const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FilterItem = styled.span`
  padding: 5px 10px;
  width: 100px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  border: 1px solid black;
  color: ${(props) => props.color || "#000"};
  background: ${(props) => props.background || "transparent"};
  &:hover {
    background: #a19aed;
    color: #ffffff;
  }
`;

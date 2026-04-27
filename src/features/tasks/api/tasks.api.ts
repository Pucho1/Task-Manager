import axios from "axios";
import type { Task } from "../types/task";

const API_URL = "http://localhost:3000/tasks";

/**
 * Obtiene todas las tareas.
 * @returns Listado de tareas.
 */
export const getAllTasks = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

/**
 * Crea una nueva tarea.
 * @param task objeto de tipo tarea
 * @returns boolean indica si se creo la tarea. 
 */
export const createTask = async (task: Task): Promise<boolean> => {
  const { data } = await axios.post(API_URL, task);
  return !!data;
};

/**
 * Obtiene una tarea seun un identificador --id--.
 * @returns Tarea solicitada.
 * @param id id de la tarea a eliminar.
 */
export const getTasksById = async (id: string) => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
};

/**
 * Elmina una tarea especifica.
 * @param id id de la tarea a eliminar.
 * @returns boolean
 */
export const deleteTasks = async (id: string) => {
  const { data } = await axios.delete(`${API_URL}/${id}`);
  return data;
};

/**
 * Actualiza una tarea.
 * @param task datos de la tarea a actualizar.
 * @returns boolean
 */
export const updateTasks = async (task: Task) => {
  const { data } = await axios.post(API_URL, task);
  return data;
};

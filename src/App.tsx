import { Button, Modal, Form, Input, Checkbox, message, Switch } from "antd";
import { useEffect, useState } from "react";
import { IToDo, IToDoRequest } from "./interfaces/todo";
import { createToDo } from "./requests/createToDo";
import { loadToDo } from "./requests/loadToDo";
import { updateToDo } from "./requests/updateToDo";
import { deleteToDo } from "./requests/deleteToDo";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [checkDone, setCheckDone] = useState(false);

  const [toDos, setToDos] = useState<IToDo[]>([]);

  const [messageApi, contextHolder] = message.useMessage();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchData = async () => {
    try {
      const todos = await loadToDo();
      setToDos(todos);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Houve um problema",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangeStatus = async (toDo: IToDo) => {
    try {
      await updateToDo(toDo);
      fetchData();
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Houve um problema",
      });
    }
  };

  const deleteToDoTask = async (id: number) => {
    try {
      await deleteToDo(id);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Houve um problema",
      });
    }
  };

  const onFinish = async () => {
    try {
      const newToDo = await createToDo(form.getFieldsValue());
      console.log(newToDo);
      messageApi.open({
        type: "success",
        content: "Tarefa criada com sucesso",
      });
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Houve um problema",
      });
    }

    form.setFieldValue("done", checkDone);
    console.log(form.getFieldsValue());
  };

  return (
    <div>
      {contextHolder}
      <Button type="primary" onClick={showModal}>
        Adicionar Tarefa
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <Button
            onClick={() => form.submit()}
            type="primary"
            htmlType="submit"
          >
            Criar tarefa
          </Button>
        }
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Atividade"
            name="nome"
            rules={[
              {
                required: true,
                message: "Por favor, insira o titulo da atividade",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="done"
            valuePropName="done"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox onClick={() => setCheckDone(!checkDone)}>Feito!</Checkbox>
          </Form.Item>
        </Form>
      </Modal>

      {toDos ? (
        toDos.map((todo, id) => (
          <div key={id} className="grid grid-cols-2">
            <div>{todo.nome}</div>
            <Switch
              checked={todo.done}
              onClick={() => handleChangeStatus(todo)}
            />
            <Button onClick={() => deleteToDoTask(todo.id)}>
              Apagar Tarefa
            </Button>
          </div>
        ))
      ) : (
        <p>Ainda não há tarefas aqui!</p>
      )}
    </div>
  );
};

export default App;

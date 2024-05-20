import {
  Button,
  Form,
  message,
  Switch,
  Layout,
  Input,
  Row,
  Col,
  Divider,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import moment from "moment";

import { IToDo, IToDoTable } from "./interfaces/todo";
import { loadToDo } from "./requests/loadToDo";
import { deleteToDo } from "./requests/deleteToDo";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { createToDo } from "./requests/createToDo";
import { ModalEditToDo } from "./components/Modal";
import { updateStatusToDo } from "./requests/updateStatusToDo";

const App = () => {
  const [toDos, setToDos] = useState<IToDo[]>([]);
  const [toDosDataSource, setToDosDataSource] = useState<IToDoTable[]>([]);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [checkDone, setCheckDone] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedToDo, setSelectedToDo] = useState<IToDo>();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };

  const errorToast = () => {
    messageApi.open({
      type: "error",
      content: "This is an error message",
    });
  };

  const fetchData = async () => {
    try {
      const todos = await loadToDo();
      setToDos(todos);

      const todosWithKeys = todos.map((toDo, index) => {
        return { ...toDo, key: index.toString() }; // Adicionando uma chave única para cada linha
      });
      setToDosDataSource(todosWithKeys);
    } catch (error) {
      errorToast();
    }
  };

  const deleteToDoTask = async (id: number) => {
    try {
      await deleteToDo(id);
      fetchData();
      success();
    } catch (error) {
      errorToast();
    }
  };

  const onFinish = async () => {
    try {
      form.setFieldValue("done", checkDone);
      await createToDo(form.getFieldsValue());
      fetchData();
      form.resetFields();
      success();
    } catch (error) {
      errorToast();
    }
  };

  const updateStatus = async (id: number, done: boolean) => {
    try {
      await updateStatusToDo(id, done);
      success();
    } catch (error) {
      errorToast();
    }
  };

  const openModal = (todo: IToDo) => {
    setSelectedToDo(todo);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchData();
  }, [toDos]);

  const columns = [
    {
      title: "Atividade",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Data",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => moment(date).format("L"),
    },
    {
      title: "Concluída",
      dataIndex: "done",
      key: "done",
      render: (done: boolean, todo: IToDoTable) => {
        return (
          <Switch
            defaultChecked={!!todo.done}
            onChange={(check) => {
              updateStatus(todo.id, check);
            }}
          />
        );
      },
    },
    {
      title: "Editar",
      key: "edit",
      render: (todo: IToDo) => (
        <Button onClick={() => openModal(todo)}>
          <EditOutlined />
        </Button>
      ),
    },
    {
      title: "Apagar",
      key: "delete",
      render: (todo: IToDo) => (
        <Button danger onClick={() => deleteToDoTask(todo.id)}>
          <DeleteOutlined />
        </Button>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {contextHolder}
      <Header style={{ display: "flex", alignItems: "center", color: "white" }}>
        ToDo
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <ModalEditToDo
          toDo={selectedToDo}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          style={{ paddingTop: "20px" }}
        >
          <Row style={{ display: "flex", justifyContent: "space-between" }}>
            <Col span={20}>
              <Form.Item
                wrapperCol={{ span: 24 }}
                label="Nova tarefa"
                name="nome"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira o titulo da tarefa",
                  },
                ]}
              >
                <Input placeholder="O que vamos fazer hoje?" />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item
                label="Tarefa já feita"
                name="done"
                valuePropName="done"
              >
                <Switch
                  checked={checkDone}
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  onClick={() => setCheckDone(!checkDone)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" onClick={() => form.submit()}>
            Adicionar Tarefa
          </Button>
        </Form>
        <Divider />
        <Table dataSource={toDosDataSource} columns={columns} />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Cindy ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default App;

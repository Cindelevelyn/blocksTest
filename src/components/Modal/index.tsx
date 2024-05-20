import { Button, Col, Form, Input, Modal, Row, Switch } from "antd";
import { useEffect } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { IToDo, IToDoRequest } from "../../interfaces/todo";
import { updateToDo } from "../../requests/updateToDo";

export interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  toDo?: IToDo;
}

export function ModalEditToDo({
  isModalOpen,
  setIsModalOpen,
  toDo,
}: ModalProps) {
  const [form] = Form.useForm();

  const onFinish = async (values: IToDoRequest) => {
    try {
      await updateToDo(toDo!.id, values);
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {}
  };

  useEffect(() => {
    if (toDo) {
      form.setFieldsValue({
        nome: toDo.nome,
        done: toDo.done,
        createdAt: toDo.createdAt,
      });
    }
  }, [isModalOpen, toDo]);

  return (
    <Modal
      title="Editar tarefa"
      open={isModalOpen}
      onOk={() => form.submit()}
      onCancel={() => {
        setIsModalOpen(false);
        form.resetFields();
      }}
      footer={[
        <Button
          key="cancel"
          onClick={() => {
            setIsModalOpen(false);
            form.resetFields();
          }}
        >
          Cancelar
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Editar tarefa
        </Button>,
      ]}
    >
      <Form<IToDoRequest>
        layout="vertical"
        form={form}
        onFinish={onFinish}
        style={{ paddingTop: "20px" }}
      >
        <Row style={{ display: "flex", justifyContent: "space-between" }}>
          <Col span={15}>
            <Form.Item
              wrapperCol={{ span: 24 }}
              label="Editar tarefa"
              name="nome"
              rules={[
                {
                  required: true,
                  message: "Por favor, insira o título da tarefa",
                },
              ]}
            >
              <Input placeholder="O que vamos fazer hoje?" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Tarefa já feita"
              name="done"
              valuePropName="checked"
            >
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
              />
            </Form.Item>
            <Form.Item
              wrapperCol={{ span: 24 }}
              label="Editar tarefa"
              name="createdAt"
              style={{ display: "none" }}
              rules={[
                {
                  required: true,
                  message: "Por favor, insira o título da tarefa",
                },
              ]}
            >
              <Input placeholder="O que vamos fazer hoje?" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
